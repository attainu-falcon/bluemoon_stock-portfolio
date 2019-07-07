/*jshint esversion: 6*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoClient = require('mongodb').MongoClient;
const userlist = require('./dbfolder/userlist.json');
const path = require('path');
PORT = process.env.PORT||8080;
const scriptPath = path.join(__dirname, '/scripts');
const cssPath = path.join(__dirname, '/stylesheets');
const htmlPath = path.join(__dirname, '/userfiles');
const dbPath = path.join(__dirname, '/dbfolder');
const imgPath = path.join(__dirname, '/images');

 const dbURL = precess.env.DB_URL || "mongodb://localhost:27017";
//bbbbb
var login = require('./login');
var signup = require('./signup');
var newpassword = require('./newpassword');
app.use(session({
    secret: "This is an unknown secret."
}));

app.use(bodyParser.urlencoded());

app.use("/userfiles", express.static(htmlPath));
app.use("/scripts", express.static(scriptPath));
app.use("/stylesheets", express.static(cssPath));
app.use("/dbfolder", express.static(dbPath));
app.use("/images", express.static(imgPath));
//bbbbb
app.use('/login', login);
app.use('/signup', signup);
app.use('/newpassword', newpassword);

mongoClient.connect(dbURL, function (err, client) {
  if (err) {
    throw err;
  }
  //bbbbb
   app.locals.db = client.db('portfolio');
});


/* Home route '/' landing page for all */
app.get('/', function (req, res) {
  res.sendfile('index.html');
});

//mywatchlist route
app.get('/watchlist', function (req, res) {
  if (req.session.loggedIn===true) {
    res.sendfile('mywatchlist.html');
    }
  else {
    res.redirect('/login');
  }
});








/*Checks unauthorsied access to myportfolio & mywatchlist pages*/
app.use(function (req, res, next) {
    if (req.session.loggedIn != true && (req.originalUrl.indexOf('myportfolio.html') != -1 || req.originalUrl.indexOf('mywatchlist.html') != -1)) {
        res.redirect('/login');
    }
    next();
});



// Redirection Route /profile only visible after successful login with a logout link
app.get('/user', function (req, res) {
    if (req.session.loggedIn === true) {
        res.redirect('/profile');
    } else {
        res.redirect('/login');
    }
});


app.get('/profile', function (req, res) {
  res.redirect('/portfolio');
});

//Displays user portfolio OR directs to login
app.get('/portfolio', function (req, res) {
  if (req.session.loggedIn===true) {
    res.sendfile('myportfolio.html');
    }
  else {
    res.redirect('/login');
  }
});


//New portfolio will be created by makefolio.js ; this route /makefolio is merely redirected to /portfolio
  app.post('/makefolio', function (req, res) {
    if (req.session.loggedIn===true) {
      db.collection('userfolio').insertOne((req.body),(function (err, result) {
        if (err) {throw err;
        } db.collection('userfolio').find({}).toArray(function(err, result){
          if (err) throw err;
          res.end();
        });
    }));
  } else {
    res.redirect('/portfolio');
  }
});

//opens summary page
app.get('/getsummary', function (req, res) {
  res.sendfile('summary.html');
});

//Gives the list of scrips to script.js to evaluate the summary
  app.get('/getfolio', function (req, res) {
    db.collection('userfolio').find({}).toArray(function (err, result) {
      res.json(result);
    });
  });

  app.get('/marketnews', function (req, res) {
    res.sendfile('marketnews.html');
  });

// // Logout Route /logout to destroy the session
app.get('/logout', function (req, res) {
     req.session.destroy();
     res.redirect('/');
 });
app.listen(PORT);

// app.listen(PORT, function ( {
//   var time = new Date();
//   console.log(`Server `+__filename.split('/').pop()+` is Running on PORT ${PORT} at `+ time.toTimeString());});