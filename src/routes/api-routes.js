// Dependencies
// =============================================================
var path = require("path");
var express = require("express");
var request = require("request");
var cheerio = require("cheerio");
var mongojs = require("mongojs");
var router = express.Router();

//Set up MongoDB
var databaseUrl = "newsFeed";
var collections = ["news"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
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
			db.news.insert({
				"url": url,
				"title": title,
				"link": link,
				"retrieval": new Date()
			});
		});
	});

	res.json("got google news")
});

router.get("/api/get-news", function(req, res) {
	res.json(error)
});


module.exports = router;
