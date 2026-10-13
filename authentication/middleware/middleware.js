const express = require("express");
const jwt  = require("jsonwebtoken");
const port = 3000;
const secretkey = "jwtkey@123";
const tokkencookie = 'accesstoken';





function isloggedIn(req,res,next){
const token  =  req.cookies[tokkencookie];
console.log(token)
if(!token){
    return res.status(401).send("unathurised");
}
try{
    const data = jwt.verify(token,secretkey);
    req.username = data.username;
    return next();
}
catch(err){
    return res.status(401).send("unathurised");
}
}


module.exports = isloggedIn;