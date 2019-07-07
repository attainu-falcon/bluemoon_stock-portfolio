var express = require('express');
var router = express.Router();

var db;

router.get('/', function(req, res) {
    res.sendfile('signup.html');
  });

  //new user registretion
  
 router.post('/sign_up', function(req,res){ 
   var username = req.body.username; 
  var email =req.body.email; 
 var password = req.body.password; 
  
var data = { 
      "username": username, 
      "email":email, 
       "password":password
   } 
       db = req.app.locals.db;
   db.collection('user').insertOne(data,function(err, collection){ 
            if (err) throw err; 
             console.log("Record inserted Successfully");
              
       }); 
          
      return res.send('Signup Successful' + '  <a href="/login">Login to access your account now</a>'); 
      });
  
module.exports = router;