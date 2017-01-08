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

var consumer_key ='';
var consumer_secret ='';
var bearer_token = '';
function initialize() {
    var fs = require('fs');
    var text = fs.readFileSync('keys.txt', 'utf-8');
    var keys = text.split("\n");
    for (var i = 0; i < keys.length; i++){
        keys[i] = keys[i].substring(keys[i].indexOf("\'") +1 , keys[i].lastIndexOf("\'"));
    }
    consumer_key = keys[0];
    consumer_secret = keys[1];
    bearer_token = keys[2];
}
initialize();

var client = new Twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    bearer_token: bearer_token,
});

$(function () {
    $('#playComment').click(()=>{
        // var endTime = $("#endTime").val() + ":00_JST";
        var q = $("#hashtag").val() + " -filter:retweets -filter:media -filter:links since:" +
            $("#startTime").val() + ":00_JST until:" + $("#endTime").val() + ":00_JST"
        var count = 20;
        client.get('search/tweets', {
            q: q,
            count: count
        }, function (error, tweets, response) {
            if (error) throw error;
            var tweetIndex = tweets.statuses.length;
            if (tweets.statuses.length > 5){
                tweets.statuses.sort(compareFav);
                tweetIndex = 5;
            }
            for (var i = 0; i < tweetIndex; i++) {
                if (!tweets.statuses[i].in_reply_to_user_id) {
                    //ハッシュタグ消去
                    console.log(tweets.statuses[i].text.replace(/#.+($| |\n)/g," "));
                    console.log(tweets.statuses[i].retweet_count);
                    console.log(tweets.statuses[i].favorite_count);
                    nico.send(tweets.statuses[i].text.replace(/#.+($| |\n)/g," "));
                }
            }
            //アニメーション終了処理
            $(".nicojs-comment").bind("animationend webkitAnimationEnd", function(){
                $(this).remove();
                });
        });

    })
})

//リサイズ処理
$(window).on('load resize', function(){
    var nicoHeight = $(window).height() -50;
    $("#nico").css("height", nicoHeight + "px");
    nico.height = nicoHeight;
});

function compareFav(a, b) {
    var i = b.favorite_count - a.favorite_count;
    if (i == 0){
        return b.retweet_count - a.retweet_count;
    }
    return i;
}

