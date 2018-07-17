require("dotenv").config();
var Twitter = require("twitter");
var keys = require("./keys.js");
//var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require("request");


//var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var liriOutput = process.argv[2];

switch (liriOutput) {
  case "my-tweets":
      myTweets();
      break;
};

      function myTweets() {
        var params = { screen_name: 'node_project' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                for (var i = 0; i < tweets.length; i++) {
    
                    console.log(tweets[i].text);
                };
            } else {
                console.log("error: " + err);
                return;
            };
        });
    };
  