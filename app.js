const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const userModel=require('./models/user')
var jwt = require('jsonwebtoken');
var cookieParser=require('cookie-parser')


// Serve the static files from the React app

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/signup',async (req,res)=>{
  const {fullname,username,password}=req.body
    const user=await userModel.find()
    if(user.length===0){
      const createduser=await userModel.create({fullname,username,password});
      res.redirect('/login')
    }
    else{
      console.log(user)
    }
})

// app.get('/profile',)

app.post('/profile',async (req,res)=>{
  const {username,password}=req.body
  const user=await userModel.findOne({username});
  if(user!==null){
    var token = jwt.sign({ username }, 'shhhhh');
    res.cookie('token',token)
  }
  else{
    res.redirect('/')
  }
})

app.post('/profile',async (req,res)=>{
  // console.log(req.token)
  // console.log(req.token)
  // const username=jwt.verify(req.value, 'shhhhh')
  // console.log(username)
  res.send({'n':'p'})
  // const user=userModel.find({username})
  // console.log(user)
  // res.send(user.json());
})

function isLoggedIn(req,res,next){
  if(req.cookies.token===''){
    res.redirect('/')
  }
  else{
    console.log(req.cookies.token)
    next()
  }
}

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
