const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const userModel=require('./models/user')
var jwt = require('jsonwebtoken');
var cookieParser=require('cookie-parser')


// Serve the static files from the React app

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});



app.listen(PORT);
