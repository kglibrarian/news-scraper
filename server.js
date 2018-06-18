var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var connection = require("./config/connection.js");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// var axios = require("axios");
// var cheerio = require("cheerio");


var PORT = 3000;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/news-scraper");

require("./config/connection")(app);

// Routes
// =============================================================
require("./controllers/news_controller")(app);

// //Routes

// // Create all our routes and set up logic within those routes where required.
// app.get("/", function(req, res) {
//     res.render("index");
// });
 

// //A GET route for scraping the echoJS website
// app.get("/scrape", function(req, res) {
//   // First, we grab the body of the html with request
//   axios.get("http://www.echojs.com/").then(function(response) {
//     // Then, we load that into cheerio and save it to $ for a shorthand selector
//     var $ = cheerio.load(response.data);

//     // Now, we grab every h2 within an article tag, and do the following:
//     $("article h2").each(function(i, element) {
//       // Save an empty result object
//       var result = {};

//       // Add the text and href of every link, and save them as properties of the result object
//       result.title = $(this)
//         .children("a")
//         .text();
//       result.link = $(this)
//         .children("a")
//         .attr("href");

//       // Create a new Article using the `result` object built from scraping
//       db.Article.create(result)
//         .then(function(dbArticle) {
//           // View the added result in the console
//           console.log(dbArticle);
//         })
//         .catch(function(err) {
//           // If an error occurred, send it to the client
//           return res.json(err);
//         });
//     });

//     // If we were able to successfully scrape and save an Article, send a message to the client
//     res.send("Scrape Complete");
//   });
// });

// // Route for getting all Articles from the db
// app.get("/articles", function(req, res) {
//   // TODO: Finish the route so it grabs all of the articles
//   db.Article.find({})
//   .then(function(dbArticle){
//     res.json(dbArticle)
//   })
// });

// // Route for grabbing a specific Article by id, populate it with it's note
// app.get("/articles/:id", function(req, res) {
//   // TODO
//   // ====
//   // Finish the route so it finds one article using the req.params.id,
//   var article = req.params.id
//   console.log(article);
//   db.Article.findOne({_id: article})
//   .populate("note")
//   .then(function(dbArticle){
//     res.json(dbArticle)
//   })
//   .catch(function(err) {
//     // If an error occurs, send it back to the client
//     res.json(err);
//   });


//   // and run the populate method with "note",
//   // then responds with the article with the note included
// });





// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function(req, res) {
//   // TODO
//   // ====
//   // save the new note that gets posted to the Notes collection
//   // then find an article from the req.params.id
//   // and update it's "note" property with the _id of the new note
//   // Create a new Note in the db
//   db.Note.create(req.body)
//     .then(function(dbNote) {
//       // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
//       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//       return db.Article.findOneAndUpdate({ _id: req.params.id }, {note: dbNote._id}, {new: true});
//     })
//     .then(function(dbUser) {
//       // If the User was updated successfully, send it back to the client
//       res.json(dbUser);
//     })
//     .catch(function(err) {
//       // If an error occurs, send it back to the client
//       res.json(err);
//     });

// });

// // Import routes and give the server access to them.
// var routes = require("./controllers/news_controller.js");

// app.use(routes);



// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
