var express = require('express');
var session = require('express-session');
var db = require('./data/user.json');
var bodyParser = require('body-parser');
var app = express();
app.use(session({
    secret: "Express session secret!"
}));
app.use(bodyParser.urlencoded());
app.get('/myportfolio.html', function(req, res) {
    if(req.session.login === true) {
        res.sendfile('./public/myportfolio.html');
}
else {
    res.send("To access your portfolio, you have to login first!" + "<a href='/login.html'>login</a>")
}

   
   });
   //we need to connect mongoDB database instead of /data/user.json
   app.get('/home.html', function(req, res) {
       res.sendfile('public/home.html')
});
app.get('/mywatchlist.html', function(req, res) {
    if(req.session.login === true) {
        res.sendfile('./public/mywatchlist.html');
}
else {
    res.send("To access your watchlist, you have to login first!" + "<a href='/login.html'>login</a>")
}
    
});
app.get('/marketnews.html', function(req, res) {
    res.sendfile('public/marketnews.html')
});
app.get('/signup.html', function(req, res) {
    res.sendfile('public/signup.html')
});
   app.get('/login.html', function(req, res) {
    if(req.session.login === true) {
        res.send("You are already logged in!" + " " + "Go to the " + "<a href='/home.html'>Home Page.</a>");
    }
    else{
        res.sendfile('./public/login.html');
}
});
 

//app.use(express.static('public'))



app.post('/signup', function(req, res) {
        db.push(req.body);
        res.send('You have successfully registered to our database.');
        console.log(req.body);

        });    

app.post('/auth', function(req, res) {
    for(var i=0; i<db.length; i++) {
        if(req.body.email === db[i].email && req.body.password === db[i].password) {
            req.session.login = true;
            req.session.userName = db[i].name;
            
        }
    }
    res.redirect('./welcomeuser');
    
});
app.get('/welcomeuser', function(req, res) {
    if(req.session.login == true) {
        res.sendfile('./public/myportfolio.html');
    }
    else {
        res.send("Password or email id is incorrect!" + "Do you want to register as a new user?" + "<a href='/signup.html'>Register Here</a>"
        );
    }
})

 app.get('/logout', function(req, res) {
     req.session.destroy();
    
     res.send("You have successfully logout <a href='/login.html'>login again?</a>");
     //res.redirect('./public/login.html')
     });
app.listen('3000');