
//require all necessary packages 
var dotenv = require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require("node-spotify-api")
var axios = require("axios")
var moment = require("moment");

var spotify = new Spotify(keys.spotify);

//simplify the node arguments
var nodeArgs = process.argv

//assigning the first user input as the action
var action = process.argv[2];

if(action === "concert-this"){

}

if(action === "spotify-this-song"){
    
}

if(action === "movie-this"){
    
}

if(action === "do-what-it-says"){
    
}

else{
    console.log("Please use one of these functions")
    console.log("concert-this <artist name>")
    console.log("spotify-this-song <song name>")
    console.log("movie-this <movie name>")
    console.log("do-what-it-says")
}
var subject = "";

for (var i = 3; i < nodeArgs.length; i++){
    if (i > 3 && i < nodeArgs.length) {
        subject = subject + "+" + nodeArgs[i];
      }
      else {
        subject += nodeArgs[i];
    
      }
}


