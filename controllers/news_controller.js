// *********************************************************************************
// news-controller.js - this file offers a set of routes 
// *********************************************************************************

// Dependencies
// =============================================================
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

// var express = require("express");
//Express is "app" being passed into the function. 

// Import the model (articles.js, index.js, notes.js) to use its database functions.
// var Articles = require("../models/Articles.js");
// var index = require("../models/index.js");
// var Notes = require("../models/Notes.js");


// Require all models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {



// Create all our routes and set up logic within those routes where required.
app.get("/", function(req, res) {
  res.render("index");
});

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.echojs.com/").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
  
      // Now, we grab every h2 within an article tag, and do the following:
      $("article h2").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .children("a")
          .text();
        result.link = $(this)
          .children("a")
          .attr("href");
     

        
  
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function(dbarticle) {
            // View the added result in the console
            console.log(dbarticle);
          })
          .catch(function(err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });
      });
  
      // If we were able to successfully scrape and save an Article, send a message to the client
      res.send("Scrape Complete");
    });
  });
  
  // Route for getting all Articles from the db
 app.get("/articles", function(req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find({})
    .then(function(dbarticle){
      res.json(dbarticle)
    })
  });
  
  // Route for grabbing a specific Article by id, populate it with it's note
 app.get("/articles/:id", function(req, res) {
    // TODO
    // ====
    // Finish the route so it finds one article using the req.params.id,
    var article = req.params.id
    console.log(article);
    db.Article.findOne({_id: article})
    .populate("note")
    .then(function(dbarticle){
      res.json(dbarticle)
    })
    .catch(function(err) {
      // If an error occurs, send it back to the client
      res.json(err);
    });
  
  
    // and run the populate method with "note",
    // then responds with the article with the note included
  });
  
   
  
  
  // Route for saving/updating an Article's associated Note
app.post("/articles/:id", function(req, res) {
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id
    // and update it's "note" property with the _id of the new note
    // Create a new Note in the db
    db.Note.create(req.body)
      .then(function(dbnote) {
        // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, {note: dbnote._id}, {new: true});
      })
      .then(function(dbUser) {
        // If the User was updated successfully, send it back to the client
        res.json(dbUser);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  
  });



app.put("/articles/:id", function(req, res) {
  db.Article.findOneAndUpdate({ _id: req.params.id }, {saved: true})
  .then(function(saved) {
    // If the User was updated successfully, send it back to the client
    res.json(saved);
  })
});


app.get("/articles/saved", function(req, res) {
  // TODO: Finish the route so it grabs all of the articles that are saved (i.e.true)
  db.Article.find({save: true})
  .then(function(dbsaved){
    res.json(dbsaved)
  }) 

app.get("/saved", function(req, res) {
  res.render("saved");
})
 
});




};



// Export routes for server.js to use.
// module.exports = router;
