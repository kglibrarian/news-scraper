$(document).ready(function() {


// Grab the articles as a json
$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      //("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
      //("#articles").append("<div class='card' style='width:18rem;'"+"<div class ='card-body'>" + "<p class='card-title' data-id='" + data[i]._id + "'>" + data[i].title + "</p>" + "<p class='card-text'>" + data[i].link + "</p>" +"</div>"+ "</div>");
      //target="_blank">' + data[i].title + "</a></p><p>" + data[i].venue + "</p>");
      $("#articles").append(
        `<div class="card" data-id="${data[i]._id}" style="width: 40rem;">
          <div class="card-body">
          <p class="card-title"> ${data[i].title} </p>
            <p class="card-text">
              <a href="${data[i].link}/"target="_blank">${data[i].link}</a>
            </p>
            <a href="#" class="btn btn-primary" id = "saved" data-id="${data[i]._id}">Save</a>
          </div>
        </div>`
      );
    }
  });

  function getSaved () {
  $.getJSON("/articles", function(data) {
   
    var saved = data.filter(key => {
      return key.saved === true;
      })
      console.log(saved)
    // For each one
    for (var i = 0; i < saved.length; i++) {
      // Display the apropos information on the page
      
      $("#articles").append(
        `<div class="card" data-id="${saved[i]._id}" style="width: 40rem;">
          <div class="card-body">
          <p class="card-title"> ${saved[i].title} </p>
            <p class="card-text">
              <a href="${saved[i].link}/"target="_blank">${saved[i].link}</a>
            </p>
            <a href="#" class="btn btn-primary" id = "saved" data-id="${saved[i]._id}">Save</a>
          </div>
        </div>`
      );
    }
  });
};
  
$(document).on('click', '#saved-list', function(req, res) {
  event.preventDefault();
  $("#articles").empty();
  getSaved();
  });

 // Whenever someone clicks a card title tag
  $(document).on("click", ".card", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");
  
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });


  // When you click the saved button
  $(document).on("click", "#saved", function() {
    // Grab the id associated with the article from the submit button
    var thisId = $(this).attr("data-id");

  $.ajax({
    method: "PUT",
    url: "/articles/" + thisId,
    data: {
      saved: true
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      
      
    });
  });

  $(document).on("click", "#saved-list", function(){
    console.log("test");
    $("#articles").empty();
    getSaved();
  })





})