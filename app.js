const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const userModel=require('./models/user')
var jwt = require('jsonwebtoken');
var bcrypt=require('bcrypt');
var cookieParser=require('cookie-parser')

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
  let {username,fullname,password}=req.body
  const user=await userModel.find({username});
  if(user.length===0){
    bcrypt.genSalt(process.env.SALT || 10,(err,salt)=>{
      bcrypt.hash(password,salt,async (err,hash)=>{
        const user=await userModel.create({
          username, fullname, password:hash, 
        })
        let token=jwt.sign({username,userid:user._id},process.env.SECRET || 'shhhhhhh');
        res.cookie('token',token);
        res.redirect(`/profile`);
      })
    })
  }
  else{
    res.status(500).send('username already taken!')
  }
})

app.get('/profile',isLoggedIn,async (req,res)=>{
  const user=await userModel.findOne({username:req.user.username});
  res.render('profile',{user});
})

app.get('/login',(req,res)=>{
  res.render('login')
})

app.post('/login',async (req,res)=>{
  const {username,password} = req.body;
  let user=await userModel.findOne({username});
  if(!user) return res.status(500).send('Something went wrong!');
  bcrypt.compare(password,user.password,(err,result)=>{
    if(result){
      let token=jwt.sign({username,userid:user._id},process.env.SECRET || 'shhhhhhh');
      res.cookie('token',token);
      res.redirect('/profile');
    }
    else{
      res.send('Something went wrong!');
    }
  })
})

function isLoggedIn(req,res,next){
  if(req.cookies.token===undefined){
    res.redirect('/login')
  }
  else if(req.cookies.token===""){
    res.redirect('/login')
  }
  else{
    let data=jwt.verify(req.cookies.token,process.env.SECRET || 'shhhhhhh');
    req.user=data;
    next()
  }
}

app.listen(PORT);
