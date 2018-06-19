module.exports = function(app) {

// Set up Mongoose connection.
var mongoose = require("mongoose");

//Set up default mongoose connection
// var mongoDB = 'mongodb://localhost/news-scraper';
// mongoose.connect(mongoDB);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);


// Get Mongoose to use the global promise library
// mongoose.Promise = global.Promise;
//Get the default connection
// var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

};
// Export connection for our ORM to use.
// module.exports = connection;
