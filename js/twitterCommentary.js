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
var comment = 'test';
client.get('search/tweets', {q: "#とは -filter:retweets -filter:media",// since:2016-08-26 until:2016-08-27
    count:2, in_reply_to_status_id: null}, function (error, tweets, response) {
    if(error) throw error;
    for(var i = 0; i< tweets.statuses.length; i++){
        console.log(tweets.statuses[i].text);  // The favorites.
        comment = tweets.statuses[i].text;
    }
    comment = 'success';
    // console.log(response);  // Raw response object.
});

// var nico = new NicoCSS({
//     ele: document.getElementById("nico"), // スクリーンになる要素
//     width: $(window).width() -20,                           // スクリーン幅
//     height: $(window).height()-20,                          // スクリーン高さ
//     font: 50,                             // フォントサイズ
//     color: '#fff',                        // フォントカラー
//     speed: 3                              // 流れるスピード
// });

// nico.listen();
// nico.send("fdaf");
// nico.send(comment);
