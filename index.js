/*jshint esversion: 6*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const userlist = require('./dbfolder/userlist.json');
const path = require('path');
PORT = process.env.PORT||8080;
const scriptPath = path.join(__dirname, '/scripts');
const cssPath = path.join(__dirname, '/stylesheets');
const htmlPath = path.join(__dirname, '/userfiles');
const dbPath = path.join(__dirname, '/dbfolder');
const imgPath = path.join(__dirname, '/images');


app.use(session({
    secret: "This is an unknown secret."
}));

app.use(bodyParser.urlencoded());

app.use("/userfiles", express.static(htmlPath));
app.use("/scripts", express.static(scriptPath));
app.use("/stylesheets", express.static(cssPath));
app.use("/dbfolder", express.static(dbPath));
app.use("/images", express.static(imgPath));


/* Home route '/' landing page for all */
app.get('/', (req, res) => {
  res.sendfile('index.html');
});


// opens login & new user page
app.get('/login', (req, res) => {
  if (req.session.loggedIn===true) {
    redirect('/');
  } else {
    res.sendfile('login.html');
  }
});
<<<<<<< HEAD
app.get('/mywatchlist.html', function(req, res) {
    if(req.session.login === true) {
        res.sendfile('./public/mywatchlist.html');
}
else {
    res.send("To access your watchlist, you have to login first!" + "<a href='/login.html'>login</a>")
}
    
=======


// Authentication Route to verify user login credentials
app.post('/auth', (req, res) => {
  for (var i=0; i<userlist.length; i++) {
    if ((userlist[i].username === req.body.username) && (userlist[i].password === req.body.password)) {
      req.session.loggedIn = true; }
    }
    res.redirect('/user');
>>>>>>> 41062bc41fe23a696d40272863bb85072f8c01e7
});


/*Checks unauthorsied access to myportfolio & mywatchlist pages*/
app.use((req, res, next) => {
    if (req.session.loggedIn != true && (req.originalUrl.indexOf('myportfolio.html') != -1 || req.originalUrl.indexOf('mywatchlist.html') != -1)) {
        res.redirect('/login');
    }
    next();
});



// Redirection Route /profile only visible after successful login with a logout link
app.get('/user', (req, res) => {
    if (req.session.loggedIn === true) {
        res.redirect('/profile');
    } else {
        res.redirect('/login');
    }
});


app.get('/profile', (req, res) => {
  res.redirect('/portfolio');
});

//Displays user portfolio OR directs to login
app.get('/portfolio', (req, res) => {
  if (req.session.loggedIn===true) {
    res.sendfile('myportfolio.html');
    }
  else {
    res.redirect('/login');
  }
});

//New portfolio will be created by makefolio.js ; this route /makefolio is merely redirected to /portfolio
app.post('/makefolio', (req, res) => {
  if (req.session.loggedIn===true) {
    res.redirect('/portfolio', {
    });
  }});


  app.get('/marketnews', (req, res) => {
    res.sendfile('marketnews.html');
  });

// Logout Route /logout to destroy the session
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(PORT, ()=> {
  var time = new Date();
  console.log(`Server `+__filename.split('/').pop()+` is Running on PORT ${PORT} at `+ time.toTimeString());});
