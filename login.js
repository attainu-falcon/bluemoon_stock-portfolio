var express = require('express');
var router = express.Router();

var db;

// opens login & new user page
router.get('/', function (req, res) {
    if (req.session.loggedIn===true) {
      res.redirect('/portfolio');
    } else {
      res.sendfile('login.html');
    }
  });


  
// Authentication Route to verify user login credentials
router.post('/auth', function (req, res) {
    db = req.app.locals.db;
    db.collection('user').findOne({ username: req.body.username}, function(err, user) {
        if(user ===null){
          res.send('Login invalid' + ' <a href="/">Go to the home page</a>');
       }else if (user.username === req.body.username && user.password === req.body.password){
        req.session.loggedIn = true;
       console.log('Login successful');
       res.redirect('/user');
     } else {
       console.log("Credentials wrong");
       res.send('Login invalid' + ' <a href="/login">try again</a>');
     }
    })
  });

module.exports = router;