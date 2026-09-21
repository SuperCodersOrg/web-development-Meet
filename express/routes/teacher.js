const express = require("express");
const router = express.Router();

router.get('/',(req,res)=>{
    res.send("teacher portal");
})

router.get('/info',(req,res)=>{
    res.send("teacher info");
})

router.get('/result',(req,res)=>{
    res.send("teacher result");
})

router.get('/notification',(req,res)=>{
    res.send("teacher notification");
})

module.exports=router;