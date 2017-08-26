// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  "url": {
    type: String,
    required: true    
  },
  "title": {
    type: String,
    required: true
  },
  // link is a required string
  "link": {
    type: String,
    required: true
  },
  "retrieval": {
    type: Date,
    required: true    
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  "comments": [{
    type: Schema.Types.ObjectId,
    ref: "Comments"
  }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
