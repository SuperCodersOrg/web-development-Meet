
const express = require('express');
const nodemailer = require('nodemailer');
const app  = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const path = require("path");
app.use(express.static(path.join(__dirname, "frontend")));
console.log(nodemailer);
let user = "meet.mittan.8888@gamil.com";

let password  = "kzyudpuehshciqwg";
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth:{
        user:user,
        pass: password
    },
});
app.get("/login", (req, res) => {
  res.redirect("/login.html");
});
app.post('/login', async (req,res)=>{
    const {to,subject,message}= req.body;
    console.log("hello");
    try {
        transporter.sendMail({
            from:user,
            to,
            subject,
            html:`<p>${message}</p>`,
        })
        res.json({
            success:true,message:"email sent successfuly"
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false
        })
    }
});
app.listen(3370,()=>console.log("server is running"));