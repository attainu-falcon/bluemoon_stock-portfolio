/*jshint esversion: 6*/

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const userlist = require('./dbfolder/userlist.json');
const path = require('path');
const hbs = require('express-handlebars');
PORT = process.env.PORT||8080;

//test comment
app.use(session({
    secret: "This is an unknown secret."
}));

app.use(bodyParser.urlencoded());
app.use(express.static('public'));

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');


// opens login & new user page
app.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login Page',
    cssStyle: '.card0{height:100vh}'
  });
});

// Authentication Route to verify user login credentials
app.post('/auth', (req, res) => {
  for (var i=0; i<userlist.length; i++) {
    if ((userlist[i].username === req.body.username) && (userlist[i].password === req.body.password)) {
      req.session.loggedIn = true; }
    }
    res.redirect('/user');
});


/*Checks unauthorsied access to myportfolio & mywatchlist pages*/
app.use((req, res, next) => {
    if (req.session.loggedIn != true && (req.originalUrl.indexOf('/myportfolio.html') != -1 || req.originalUrl.indexOf('mywatchlist.html') != -1)) {
        res.redirect('/login');
    }
    next();
});


/* Home route '/' landing page for all */
app.get('/', (req, res) => {
  res.render('home', {
    title: 'Bluemoon Stock Portfolio Dashboard',
    cssStyle: '.con{height:100vh}.col0{background-color:#fff;height:50vh}.col1{height:100vh}.col2{background-color:#fff}.col3{background-color:#fff;height:50vh}.col4{background-color:#fff;height:50vh}.col5{background-color:#fff;height:50vh}',
    script: '<script type="text/javascript" src="././livescripapis.js">',
    jqcdn: '<script  src="https://code.jquery.com/jquery-3.4.1.min.js"  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="  crossorigin="anonymous"></script>'
  });
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


app.get('/portfolio', (req, res) => {
  if (req.session.loggedIn===true) {
    res.render('myportfolio', {
      title: 'My Portfolio',
      cssStyle: '.card0{height:50vh}.card1{height:50vh}',
      script: '</script><script type="text/javascript"src="../../makenewfolio.js"></script>',
      jqcdn: '<script  src="https://code.jquery.com/jquery-3.4.1.min.js"  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="  crossorigin="anonymous"></script>'
    });
  } else {
    res.redirect('/login');
  }
});

app.post('/makefolio', (req, res) => {
  console.log(req.body.folioname);
  if (req.session.loggedIn===true) {
    res.render('/myportfolio', {
      folioname: req.body.folioname,
    });
    }
  }
);

// Logout Route /logout to destroy the session
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

app.listen(PORT, ()=> {
  var time = new Date();
  console.log(`Server `+__filename.split('/').pop()+` is Running on PORT ${PORT} at `+ time.toTimeString());});
