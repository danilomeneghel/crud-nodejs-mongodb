var express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    load = require('express-load'),
    engine = require('ejs-mate'),
    db = require('./config/db'),
    error = require('./util/error');

app.use(express.static(__dirname + '/public'));

app.engine('ejs', engine); 
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "vw9CGbidDQuqJgqCqT7Db3HvFZvtsRbb",
    resave: false,
    saveUninitialized: false
}));

load('routes').into(app);

app.use(error.notfound);
app.use(error.serverError);

app.listen(process.env.PORT, () => {
  console.log('App listening on port 3000!');
});