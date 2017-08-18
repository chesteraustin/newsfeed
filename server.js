// *****************************************************************************
// Power Hour App
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({	"defaultLayout": "main",
									"layoutsDir": path.join(__dirname, "/src/views/layouts")
									}));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "/src/views"));

// Static directory
app.use(express.static("./src/public"));

// Routes
// =============================================================
var routes = [
	require("./src/routes/view-routes.js"),
	require("./src/routes/api-routes.js")
];

app.use("/", routes);
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
	console.log("App listening on PORT " + PORT);
});
