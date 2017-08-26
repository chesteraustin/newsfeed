// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var mongojs = require("mongojs");
var router = express.Router();
var mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;

// Requiring our Note and Article models
var Article = require("./../models/Article.js");
var Comment = require("./../models/Comment.js");

/*
mongodb://heroku_wl4jxdd2:h9r5boobbj4pu09q6l3anlf6ia@ds027618.mlab.com:27618/heroku_wl4jxdd2
//Set up MongoDB
var databaseUrl = "newsFeed";
var collections = ["news"];
// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});
*/


// Database configuration with mongoose
mongoose.connect("mongodb://localhost/week18Populater");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


//Read news
router.post("/news/google", function(req, res) {
	var url = "https://news.google.com/news/?ned=us&hl=en";
	request(url, function(error, response, html) {

	// Load the HTML into cheerio and save it to a variable
	// '$' becomes a shorthand for cheerio's selector commands, much like jQuery's '$'
		var $ = cheerio.load(html);

		$(".hzdq5d").each(function(i, element) {
			var title = $(element).text();
			var link = $(element).attr("href");

			var article = new Article({
				"url": url,
				"title": title,
				"link": link,
				"retrieval": new Date()
			});

			article.save(function(err, doc) {
				// Log any errors
				if (err) {
					console.log(err)
				}
				console.log(doc)
			});
		});
	});

	res.json("got google news")
});


router.get("/api/get-news", function(req, res) {
  Article.find({}, function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.json(error);
    }
    // Or send the doc to the browser
    else {
      res.json(doc);
    }
  });
});

router.get("/api/get-comments/:id", function(req, res) {
  Article.find({"_id": req.param.id}, function(error, doc) {
    // Send any errors to the browser
    if (error) {
      res.json(error);
    }
    // Or send the doc to the browser
    else {
      res.json(doc);
    }
  });
});

module.exports = router;
