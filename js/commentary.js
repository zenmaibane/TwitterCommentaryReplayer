var nico = new NicoCSS({
    ele: document.getElementById("nico"), // スクリーンになる要素
    // width: $(window).width() -20,                           // スクリーン幅
    // height: $(window).height()-20,                          // スクリーン高さ
    font: 50,                             // フォントサイズ
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

$(window).on('resize', function(){
    nico.width = $(window).width -20;
    nico.height = $(window).height -20;
});

var client = new Twitter({
    consumer_key: consumer_key,
    consumer_secret: consumer_secret,
    bearer_token: bearer_token,
});

$(function () {
    $('#test').click(()=>{
        client.get('search/tweets', {
            q: "#imas_cg -filter:retweets -filter:media -filter:links",
            count: 10
        }, function (error, tweets, response) {
            if (error) throw error;
            for (var i = 0; i < tweets.statuses.length; i++) {
                if (!tweets.statuses[i].in_reply_to_user_id) {
                    console.log(tweets.statuses[i].text);  // The favorites.
                    nico.send(tweets.statuses[i].text);
                }
            }
        });
    })
})


