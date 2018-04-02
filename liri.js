var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var omdb = require("omdb");
var twitter = require("twitter");
var nodeSpotify = require("node-spotify-api");
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

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
    client.get('statuses/update', function(error, tweet, response) {
        if(error) throw error;
        console.log(tweet);
        console.log(response);
      });
}

function getSong()
{
    spotify.search(
        { 
            type: 'track', query: input 
        }).then(function(response) {
            console.log(response);
        }).catch(function(err) {
            console.log(err);
        });
}

function getMovie()
{
    omdb.get({ title: 'Saw', year: 2004 }, true, function(err, movie) {
        if(err) {
            return console.error(err);
        }
     
        if(!movie) {
            return console.log('Movie not found!');
        }
     
        console.log(movie.title, movie.year);
        console.log(movie.imdb.rating);
        console.log(movie.tomatoRating);
        console.log(formatList(movie.Country));
        console.log(movie.Plot);
        console.log(formatList(movie.Actors));
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