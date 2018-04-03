require("dotenv").config();
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
    var params = {screen_name: "liri1012"};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if(!error)
        {
            for(i = 0; i < 20; i++)
            {
                console.log(tweets[i].text);
                console.log(tweets[i].created_at);
            }
        }
    });
}

function getSong()
{
    var song = process.argv[3]
    if(song == undefined){
        song = "The Ace"
    }
    console.log(song)
    spotify.search({ type: 'track', query: song}, function (err, data) {
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
    var movieName = process.argv[3];    
    if (movieName == undefined) {
        movieName = "Mr.+Nobody";
    }
    console.log(movieName)

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var parsedBody = JSON.parse(body)
            console.log("Movie: " + parsedBody.Title)
            console.log("Year: " + parsedBody.Year);
            console.log("IMBD: " + parsedBody.imdbRating);
            console.log("Rotten Tomatoes: " + parsedBody.Ratings[1].Value)
            console.log("Country: " + parsedBody.Country)
            console.log("Language: " + parsedBody.Language)
            console.log("Plot: " + parsedBody.Plot)
            console.log("Actors: " + parsedBody.Actors)
        }
    })
}

function doIt()
{
    fs.readFile("random.txt", "utf8", function(err, data){
        var split = data.split(",");
        process.argv[2] = split[0];
        process.argv[3] = split[1];
        switch(split[0])
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
        } 
    })
}