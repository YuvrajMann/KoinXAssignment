// This file is the entry point of the application
// It contains the code to create the express app and connect to the database
// It also contains the code to handle errors and render the error page

//Importing http-errors to create errors
var createError = require("http-errors");
//Importing express to create the express app
var express = require("express");
//Importing path to get the path of the current file
var path = require("path");
//Importing cookie-parser to parse the cookies
var cookieParser = require("cookie-parser");
//Importing morgan to log the requests
var logger = require("morgan");
//Importing mongoose to connect to the database
var mongoose = require("mongoose");

//Importing all the routes
var indexRouter = require("./routes/index");

//Load the environment variables from the .env file
require("dotenv").config();

//Importing the cronJob module
require("./CornJob.js");

//The database is accessed using the connection string stored in the .env file
//The useNewUrlParser and useUnifiedTopology options are used to avoid deprecation warnings
//The connect method returns a promise
const connect = mongoose.connect(process.env.MONGO_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

//The then method is used to handle the promise
//The first parameter is a callback function that is called when the promise is resolved
//The second parameter is a callback function that is called when the promise is rejected
connect.then(
	(db) => {
		console.log("Connected to mongodb server");
	},
	(err) => {
		console.log(err);
	}
);

//Creating the express app
var app = express();

//view engine setup
//The path.join method is used to get the path of the views folder
app.set("views", path.join(__dirname, "views"));
//The view engine is set to ejs
app.set("view engine", "ejs");

//The app.use method is used to use a middleware

//The logger method is used to log the requests
app.use(logger("dev"));
//The express.json and express.urlencoded methods are used to parse the request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//The cookieParser method is used to parse the cookies
app.use(cookieParser());
//The express.static method is used to serve static files
app.use(express.static(path.join(__dirname, "public")));

//The app.use method is used to use a router
//The index router is used for all the routes starting with /
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	//The createError method is used to create an error
	//The next method is used to pass the error to the next middleware
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

//Export the app
module.exports = app;
