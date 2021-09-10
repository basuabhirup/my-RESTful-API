# My REST API
This project is a part of "The Complete 2021 Web Development Bootcamp" by The London App Brewery, instructed by Dr. Angela Yu and hosted through Udemy. In this project I have created my own REST API to access to a collection of articles from a locally hosted database.

- I have used all the HTTP Request Verbs (GET, POST, PUT, PATCH and DELETE)
- I have implemented the specific patterns of routes/ endpoint URLs in accordance with the standard guidelines of RESTful Routing.    

![RESTful Routing guidelines](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a65415fa-333c-46ad-9116-39ebd9ee52d4/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210909%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210909T132706Z&X-Amz-Expires=86400&X-Amz-Signature=792f030d88c03dd1e43d163c6833bd5a58c96e9d3db0b18c84bcaef65b02ae0f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)
    
- There is no front end interface of this project

## Steps I have followed
1. Used `mongod` command from a terminal to start a local database server from localhost:27017
2. Used `mongosh` command from another terminal to access to the local database with MongoDB shell.
3. Created a sample database named WikiDB, using the command `use WikiDB`
4. Created a collection named 'articles' with 4 sample documents, using the command `db.articles.insertMany({})`
5. Created a dedicated directory for the project and inside that directory initialised NPM using `npm init -y` command from another terminal.
6. Used `npm install express body-parser ejs mongoose` command to install all the required dependencies for the project. 
7. Started the server with the following boiler plate codebase:
```javascript
// Requiring necessary NPM modules:
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

// Set port for deployement as well as localhost:
const port = process.env.PORT || 3000;

// Initial Setup for the App:
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// Connect to a new MongoDB Database, using Mongoose ODM:
mongoose.connect('mongodb://localhost:27017/testDB');

// Create a new collection to store the items:
const itemSchema = new mongoose.Schema ({ //replace 'item' with your Model name
	name: {
    type: String,
    required: true
  },
	rating: {
		type: Number,
		min: 1,
		max: 10
	},
	review: String
})
const Item = mongoose.model('Item', itemSchema); //modelName must be in singular


// Handle HTTP Requests


// Enable client to listen to the appropriate port:
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
```
    
8. Modified the server code to connect to our WikiDB database and the articles collection inside it:
```javascript
// Connect to a new MongoDB Database, using Mongoose ODM:
mongoose.connect('mongodb://localhost:27017/wikiDB');

// Create a new collection to store the articles:
const articleSchema = new mongoose.Schema ({
	title: {
    type: String,
    required: true
  },
	content: String
})
const Article = mongoose.model('Article', articleSchema);
```
