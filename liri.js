require("dotenv").config();
var Twitter = require("twitter");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var request = require("request");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var liriOutput = process.argv[2];

switch (liriOutput) {
  case "my-tweets":
      myTweets();
      break;

  case "spotify-this-song":
      spotifyThisSong();
      break;

  case "movie-this":
      movieThis();
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

    function spotifyThisSong(songName){
        var songName = process.argv[3];
        if (!songName){
            songName= "The Sign";
        };
        songRequest = songName;
        spotify.search({
        type: "track",
        query: songRequest
    },
    function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
          
        }

        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
      
          console.log("Artist: " + songs[i].artists[0].name);
          console.log("song name: " + songs[i].name);
          console.log ("Preview Url: " + songs[i].preview_url);
          console.log ("Album Name: " + songs[i].album.name);
      
        }
      
      });

    };


    function movieThis(){
        var movieName = process.argv[3];
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movieInfo = JSON.parse(body);
            console.log("Title: " + movieInfo.Title);
            console.log("Year: " + movieInfo.Year);
            console.log("IMDB Rating: " + movieInfo.imdbRating);
            console.log("Rotten Tomatoes Rating: " + movieInfo.Ratings[1].Value);
            console.log("Origin Country: " + movieInfo.Country);
            console.log("Language: " + movieInfo.Language);
            console.log("Plot: " + movieInfo.Plot);
            console.log("Actors: " + movieInfo.Actors);
            
    }
});
    };