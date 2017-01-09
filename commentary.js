var nico = new NicoCSS({
    ele: document.getElementById("nico"), // スクリーンになる要素
    // width: $(window).width() -20,                           // スクリーン幅
    // height: $(window).height()-20,                          // スクリーン高さ
    font: 30,                             // フォントサイズ
    color: '#fff',                        // フォントカラー
    speed: 3                              // 流れるスピード
});

nico.listen();
var Twitter = require('twitter');

var client = new Twitter({
    consumer_key: 'zaYyuZDTedazdMPPJFa72Ad4W',
    consumer_secret: '97d5ABOznWsYfg9bk3GXki4OFZWsMdHZaeTMEpKDzUGoEalODV',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAALBByAAAAAAAWltADVCDgO05i67wgdS940p9%2BM4%3DLqeNu95fIfPJVaAm6cti6msEP41HclxQyNPfUHLs6yZE4wRth6',
});

$(function () {
    $('#playComment').click(() => {
        $("body").css("background-color", "rgba(0, 0, 0, 0.0)");
        $(".titlebar").css("background-color", "rgba(0, 0, 0, 0.0)");
        var hashtag = $("#hashtag").val();
        var startTime = $("#startTime").val() + ":00";
        var tempTime = startTime.split("_");
        var date = new Date(tempTime[0] + " " + tempTime[1]);
        var operatingSecond = $("#minutes").val() * 60;
        var intervalSeconds = 3;
        var intervalMiliSeconds = intervalSeconds * 1000;
        var sinceTime = date;
        var copyDate = new Date(date.getTime());
        copyDate.setSeconds(copyDate.getSeconds() + intervalSeconds - 1);
        var untilTime = copyDate;
        var co = require('co');

        function sleep(ms) {
            return function (cb) {
                setTimeout(cb, ms);
            };
        }

        co(function *() {
            var commentNum = 7;
                for (var time = 0; time < operatingSecond; time += intervalSeconds) { //time < operatingSecond;
                    yield sleep(intervalMiliSeconds);
                    var q = hashtag + " -filter:retweets -filter:media -filter:links since:" +
                        formatDate(sinceTime) + "_JST until:" + formatDate(untilTime) + "_JST"
                    client.get('search/tweets', {
                        q: q,
                        count: 20
                    }, function (error, tweets, response) {
                        if (error) throw error;
                        var tweetIndex = tweets.statuses.length;
                        if (tweets.statuses.length > commentNum) {
                            tweets.statuses.sort(compareFav);
                            tweetIndex = commentNum;
                        }
                        for (var i = 0; i < tweetIndex; i++) {
                            if (!tweets.statuses[i].in_reply_to_user_id) {
                                //ハッシュタグ消去
                                console.log(tweets.statuses[i].text.replace(/#.+($| |\n)/g, " "));
                                nico.send(tweets.statuses[i].text.replace(/#.+($| |\n)/g, " "));
                            }
                        }
                        //アニメーション終了処理
                        $(".nicojs-comment").bind("animationend webkitAnimationEnd", function () {
                            $(this).remove();
                        });
                    })
                    sinceTime.setSeconds(sinceTime.getSeconds() + intervalSeconds);
                    untilTime.setSeconds(untilTime.getSeconds() + intervalSeconds);
                };
            });
    })
})

//リサイズ処理
$(window).on('load resize', function () {
    var nicoHeight = $(window).height() - 98;
    $("#nico").css("height", nicoHeight + "px");
    nico.height = nicoHeight;
});

function compareFav(a, b) {
    var i = b.favorite_count - a.favorite_count;
    if (i == 0) {
        return b.retweet_count - a.retweet_count;
    }
    return i;
}

function formatDate(date) {
    function formatTime(t) {
        if (t < 10) {
            t = "0" + t;
        }
        return t;
    }

    var year = date.getFullYear();
    var month = formatTime(date.getMonth() + 1);
    var day = formatTime(date.getDate());
    var hour = formatTime(date.getHours());
    var minute = formatTime(date.getMinutes());
    var second = formatTime(date.getSeconds());
    return year + '-' + month + '-' + day + '_' + hour + ':' + minute + ':' + second;
}

