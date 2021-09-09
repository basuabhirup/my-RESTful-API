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

// ----------------------------------------------------------------
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

// -----------------------------------------------------------------
// Handle HTTP Requests
app.route('/articles')
	.get( (req, res) => {
    Article.find({}, (err, articles) => {
  		if(!err) {
  			res.send(articles);
  		} else {
        res.send(err);
      }
  	})
	})
	.post( (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const article = new Article({title, content});
    article.save(err => {
      if(!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    })
	})
	.delete( (req, res) => {
    Article.deleteMany({}, err => {
      if(err) {
        res.send(err);
      } else {
        res.send("Successfully deleted all articles");
      }
    })
	});
  
// -----------------------------------------------------
app.route('/articles/:url')
  .get( (req,res) => {
    Article.findOne({ title: req.params.url }, (err, article) => {
      if(!err) {
        if(article) {
    			res.send(article);
    		} else {
          res.send("No record found");
        }
      } else {
        res.send(err);
      }
  	})
  })
  .put((req, res) => {
    Article.replaceOne(
      {title: req.params.url},
      {title: req.body.title, content: req.body.content},
      (err) => {
        if(!err) {
          res.send("Successfully replaced the selected article.")
        } else {
          res.send(err);
        }
      }
    )
  })
  .patch((req, res) => {
    Article.updateOne(
      {title: req.params.url},
      req.body,
      (err, result) => {
        if(!err) {
          res.send("Successfully updated the selected article.")
        } else {
          res.send(err);
        }
      }
    )
  })
  .delete( (req, res) => {
    Article.deleteOne({title: req.params.url}, err => {
      if(err) {
        res.send(err);
      } else {
        res.send("Successfully deleted the selected article");
      }
    })
	});
// ------------------------------------------------------------------

// Enable client to listen to the appropriate port:
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
