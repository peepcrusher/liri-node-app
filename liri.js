
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
function spotifySearch(query){
    spotify.search({ type: 'track', query: query, limit: 5 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    //   console.log(data.tracks.items); 
      console.log("Track Name: " + data.tracks.items[0].name)
      console.log("Artist: " + data.tracks.items[0].artists[0].name)
      console.log("Link: " + data.tracks.items[0].external_urls.spotify)
      });
}

var subject = "";
//combine everything after the action into one searchable subject
for (var i = 3; i < nodeArgs.length; i++){
    if (i > 3 && i < nodeArgs.length) {
        subject = subject + "+" + nodeArgs[i];
      }
      else {
        subject += nodeArgs[i];
    
      }
}
//do what it says will read whats in random.txt and conduct a spotify search for the contents
if(action === "do-what-it-says"){
    fs.readFile("random.txt", "utf-8", function(err, data){
        if(err){
            console.log("ERROR!: " + err)
        }
        
        
        spotifySearch(data)
        
        
        
    })
    
}


//concert this plus the subject triggers an axios call to the bands in town api, and returns concert details for the subject
if(action === "concert-this"){
    var queryUrl = "https://rest.bandsintown.com/artists/" + subject + "/events?app_id=codingbootcamp"
    axios.get(queryUrl)
    .then(function(response){
        
        console.log("Venue: " + response.data[0].venue.name)
        console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country)
        console.log("Date: " + moment(response.data[0].datetime).format("MM/DD/YYYY"))
    })
}
//calls the spotifySearch function with the parameter of subject
else if(action === "spotify-this-song"){
    spotifySearch(subject)
}

//movie this triggers an axios call to the omdb page and logs some information about the subject movie
else if(action === "movie-this"){
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



// else{
//     console.log("Please use one of these functions")
//     console.log("concert-this <artist name>")
//     console.log("spotify-this-song <song name>")
//     console.log("movie-this <movie name>")
//     console.log("do-what-it-says")
// }



