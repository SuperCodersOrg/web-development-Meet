require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const app  = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const path = require("path");
app.use(express.static(path.join(__dirname, "frontend")));
console.log(nodemailer);

const transporter = nodemailer.createTransport({
    service : "gmail",
    auth:{
        user:process.env.USER,
        pass: process.env.PASSWORD
    },
});

app.get("/", (req, res) => {
  res.redirect("/index.html");
});
app.get("/login", (req, res) => {
  res.redirect("/login.html");
});
app.post('/login',  (req,res)=>{
    const {to,subject,message}= req.body;
    console.log(to,subject,message);
    console.log("hello");
    try {
        transporter.sendMail({
            from:process.env.USER,
            to:to,
            subject:subject,
            html:`<p>${message}</p>`,
        })
        res.json({
            success:true,message:"email sent successfuly"
        })
    }catch(err){
        console.log("error",err);
        res.status(500).json({
            success:false
        })
    }
});
app.listen(3370,()=>console.log("server is running"));