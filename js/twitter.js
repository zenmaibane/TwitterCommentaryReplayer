var Twitter = require('twitter');



var consumer_key ='';
var consumer_secret ='';
var bearer_token = '';
function initialize() {
    var fs = require('fs');
    var text = fs.readFileSync('test.txt', 'utf-8');
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
client.get('search/tweets', {q: ""}, function (error, tweets, response) {
    if(error) throw error;
    console.log(tweets);  // The favorites.
    // console.log(response);  // Raw response object.
});
