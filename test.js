var Twitter = require('twitter');

var consumer_key = '';
var consumer_secret = '';
var bearer_token = '';

function initialize() {
    var fs = require('fs');
    var text = fs.readFileSync('keys.txt', 'utf-8');
    var keys = text.split("\n");
    for (var i = 0; i < keys.length; i++) {
        keys[i] = keys[i].substring(keys[i].indexOf("\'") + 1, keys[i].lastIndexOf("\'"));
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

var co = require('co');

function sleep(ms) {
    return function (cb) {
        setTimeout(cb, ms);
    };
}

co(function *() {
    for (var i = 0; i < 15; ++i) {
        console.log("sleep中");
        yield sleep(3000);

        client.get('search/tweets', {
            q: "#cf_vanguard -filter:retweets -filter:media -filter:links since:2017-01-08_10:00:00_JST until:2017-01-08_10:30:00_JST",
            count: 1
        }, function (error, tweets, response) {
            if (error) throw error;
            var hiduke=new Date();
            console.log("実行やで");
            console.log(hiduke);
            for (var i = 0; i < tweets.statuses.length; i++) {
                if (!tweets.statuses[i].in_reply_to_status_id) {
                    console.log(tweets.statuses[i].text);  // The favorites.
                }
            }
            // console.log(response);  // Raw response object.
        });
    }
    return 'final value';
});







