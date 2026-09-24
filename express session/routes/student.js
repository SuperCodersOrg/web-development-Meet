const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("student portal");
})

router.get('/info',(req,res)=>{
    res.send("student info");
})

router.get('/result',(req,res)=>{
    res.send("student result");
})

router.get('/notification',(req,res)=>{
    res.send("student notification");
})

module.exports=router;


