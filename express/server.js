const authroutes = require("./routes/auth")
const studentroutes = require('./routes/student');
const teacherroutes = require('./routes/teacher');
const path = require("path");
const express = require("express");
const cors = require('cors');
const app = express();
const session = require('express-session');
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json);
app.use(express.static("public"));


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

app.get("/",(req,res)=>{
    res.redirect("/index.html");
})
app.use(authroutes);
app.use('/student',studentroutes);
app.use('/teacher',teacherroutes);

app.listen(3300,()=>{
    console.log("server is running");
})