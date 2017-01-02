"use strict";

const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
let mainWindow;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});


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

// var comment = 'test';

var jschardet = require('jschardet');
var iconv = require('iconv');

// Electronの初期化完了後に実行
app.on('ready', function () {
    // メイン画面の表示。ウィンドウの幅、高さを指定できる
    mainWindow = new BrowserWindow({
        "width": 800,
        "height": 600,
        "transparent": true,
        "frame": false,
        "resizeble": true,
    });
    mainWindow.loadURL('file://' + __dirname + '/index.html');

    client.get('search/tweets', {q: "#とは -filter:retweets -filter:media",// since:2016-08-26 until:2016-08-27
        count:2, in_reply_to_status_id: null}, function (error, tweets, response) {
        if(error) throw error;
        for(var i = 0; i< tweets.statuses.length; i++){
            console.log(tweets.statuses[i].text);  // The favorites.
            var encode = jschardet.detect(tweets.statuses[i].text);
            var result = encode.encoding;
            console.log(result)
            // comment = tweets.statuses[i].text;
        }
        // comment = 'success';
        // console.log(response);  // Raw response object.
    });

    // ウィンドウが閉じられたらアプリも終了
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
