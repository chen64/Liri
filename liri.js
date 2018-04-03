var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var omdb = require("omdb");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.Spotify);
var client = new Twitter(keys.Twitter);

var option = process.argv[2];
var input = process.argv[3];

switch(option)
{
    case "my-tweets":
        getTweets();
        break;
    case "spotify-this-song":
        getSong();
        break;
    case "movie-this":
        getMovie();
        break;
    case "do-what-it-says":
        doIt();
        break;
}

function getTweets()
{
    var params = {screen_name: "liri1012", length: 20};
    client.get('statuses/user_timeline', params, function(error, tweet, response) {
        if(!error){
            for(i = 0; i < params.length; i++){
                console.log(tweet[i]);
                console.log(tweet[i].created_at)
            }
        //console.log(tweet);
        //console.log(response);
        }
    });
}

function getSong()
{
        spotify.search({ type: 'track', query: input}, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
     
            var artist = data.tracks.items[0].artists[0].name;
            var name = data.tracks.items[0].name;
            var album = data.tracks.items[0].album.name;
            var preview = data.tracks.items[1].preview_url
     
            console.log("Artist Name: " + artist + '\n' + "Track Name: " + name + '\n' + "Album Name: " + album + '\n' + "Preview Link - " + preview);
        });
}

function getMovie()
{
    omdb.search(input, function(err, movie) {
        if(err) {
            return console.error(err);
        }
        if(movies.length < 1) {
            return console.log('No movies were found!');
        }
     
        movies.forEach(function(movie) {
        console.log(movie.Title);
        console.log(formatYear(movie.Year));
        console.log(movie.imdbRating ? +movie.imdbRating : null);
        console.log(movie.tomatoRating);
        console.log(formatList(movie.Country));
        console.log(movie.Plot);
        console.log(movie.Actors);
        });
    });
}

function doIt()
{
    fs.readFile("random.txt", "utf8", callback)
    var callback = function(error, data){
        if(error){
            return console.log(error)
        }
        console.log(getSong())
    }
}