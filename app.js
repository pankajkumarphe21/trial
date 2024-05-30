const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const userModel=require('./models/user')
var jwt = require('jsonwebtoken');
var bcrypt=require('bcrypt');
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

app.post('/signup',async (req,res)=>{
  const user=await userModel.find({username:req.body.username});
  if(user.length===0){
    const user=await userModel.create({
      username:req.body.username, 
      fullname:req.body.fullname, 
      password:req.body.password, 
    })
    res.redirect(`/profile/${user._id}`)
  }
  else{
    res.send('username already taken')
  }
})

app.get('/profile/:id',async (req,res)=>{
  const user=await userModel.findOne({_id:req.params.id});
  res.render('profile',{user})
})

app.get('/login',(req,res)=>{
  res.render('login')
})

app.listen(PORT);
