
//require all necessary packages 
var dotenv = require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

//simplify the node arguments
var nodeArgs = process.argv

//assigning the first user input as the action
var action = process.argv[2];

//variable for the subject of the search
var subject = "";

for (var i = 3; i < nodeArgs.length; i++){
    if (i > 3 && i < nodeArgs.length) {
        subject = subject + "+" + nodeArgs[i];
      }
      else {
        subject += nodeArgs[i];
    
      }
}

if(action === "concert-this"){

}

if(action === "spotify-this-song"){
    
}

if(action === "movie-this"){
    var queryUrl = "http://www.omdbapi.com/?t=" + subject + "&y=&plot=short&apikey=trilogy"

axios.get(queryUrl)
.then(function(response){
    console.log("Title: " + response.data.Title);
    console.log("Release Year: " + response.data.Year);
    console.log("IMDB Rating: " + response.data.imdbRating);
    console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
    console.log("Country of Origin: " + response.data.Country);
    console.log("Movie Language: " + response.data.Language);
    console.log("Plot: " + response.data.Plot);
    console.log("Actors: " + response.data.Actors);
})
}

if(action === "do-what-it-says"){
    
}

// else{
//     console.log("Please use one of these functions")
//     console.log("concert-this <artist name>")
//     console.log("spotify-this-song <song name>")
//     console.log("movie-this <movie name>")
//     console.log("do-what-it-says")
// }



