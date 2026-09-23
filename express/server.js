const express = require("express");
const session = require('express-session');
const authroutes = require("./routes/auth")
const studentroutes = require('./routes/student');
const teacherroutes = require('./routes/teacher');
const path = require("path");

const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());

const users ={
   student1: {
        username :"meet",
        password:"meet@123"
    }
};
app.use(
    session({
        secret:"meet@123",
        resave:false,
        saveUninitialized:false,
        cookie:{
            httpOnly:true,
  maxAge:1000*60*60*24,
        },
      
    })
);
function isloggedin(req,res,next){
    if(!req.session.user.username){
return res.redirect("/login");
    }
    next();
}
app.get("/",(req,res)=>{
    res.redirect("index.html");
})
app.get("/login",(req,res)=>{
    res.redirect("login.html");
})
app.post('/login',(req,res,next)=>{
    const {username,password}=req.body;
    const user = users.find((u)=>u.username===username&&u.password===password);
    if(!user){
        return res.json({message:"invalid credentials",success:"false"})
    }
req.session.user = {
    username:user.username,
    password: user.password
};

 // res.json({message:"login successfull",success:"true"})

}
)

app.post('/signup',(req,res)=>{
    const {username,password}=req.body;

    const user = users.find((u)=>u.username===username&&u.password===password);
    if(!user){
        return res.json({message:"invalid credentials",success:"false"})
    }    users.push(user);
req.session.user = {
    username:user.username,
    password: user.password
};

  res.json({message:"sigin in successfull",success:"true"})

})

app.get("/signup",(req,res)=>{
    res.redirect("signin.html");
})

app.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.clearCookie('connect.sid');
        res.redirect('index.html'); 
    })
});

app.listen(3300,()=>{
    console.log("server is running");
})