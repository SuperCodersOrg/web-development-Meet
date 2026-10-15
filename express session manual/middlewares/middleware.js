const express = require("express");

function checkauth(req,res,next){
const token  =  req.cookies["accesscookie"];
console.log(token);
}




module.exports = {checkauth};