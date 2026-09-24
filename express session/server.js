const express = require("express");
const session = require('express-session');

const studentroutes = require('./routes/student');
const teacherroutes = require('./routes/teacher');
const path = require("path");
const cors = require('cors');
const router = require("./routes/auth");
const app = express();
app.use(cors())
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());

const users =[
   {
        username :"meet",
        password:"meet@123",
        role:"student"
    },
     {
        username :"meet",
        password:"meet@1230",
         role:"teacher"
    }
];
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
const isloggedin = (req,res,next)=>{
   if (req.session && req.session.user) {
    return next();

    }
    next();
}
router.get("/",(req,res)=>{
    res.redirect("index.html");
})
app.get("/login",(req,res)=>{
    res.redirect("login.html");
})
app.post('/login',(req,res,next)=>{
    const {username,password}=req.body;
    console.log(username,password)
    const user = users.find((u)=>u.username===username&&u.password===password);
    console.log(user);
    if(!user){
        return res.json({message:"invalid credentials",success:"false"})
    }
req.session.user = {
    username:user.username,
   password:user.password

};
if (role === "student") {
    res.redirect(303, "/student");
  } else {
    res.redirect(303, "/teacher");
  }
  res.json({message:"login successfull",success:"true"})

}
)

app.post('/signup',(req,res,next)=>{
    const {username,password,role}=req.body;

    const user = users.find((u)=>u.username===username&&u.password===password);
    if(!user){
        return res.json({message:"invalid credentials",success:"false"})
    }    users.push(user);
req.session.user = {
    username:user.username,
 password:user.password

};
 if (role === "student") {
    res.redirect(303, "/student");
  } else {
    res.redirect(303, "/teacher");
  }
  res.json({message:"sigin in successfull",success:"true"})
next();
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



app.use("/student", studentroutes);
app.use("/teacher", teacherroutes);

app.listen(3300,()=>{
    console.log("server is running");
})