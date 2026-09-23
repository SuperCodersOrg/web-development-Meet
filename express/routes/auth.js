const express = require("express");
const router = express.Router();

const path = require('path');

// router.get(['/','/login','/signup'],(req,res)=>{
//     if(req.session && req.session.user){
//         return res.redirect(`${req.session.user.role}`)
//     }


//     res.sendFile(path.join(__dirname,'../frontend/index.html'));
// });
router.post('/signup', (req, res) => {
  const { name, email, password, role } = req.body;

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.send('User already exists! <a href="/login">Go to Login</a>');
  }

  
  users.push({
    name, 
    email,
    password,
    role: role 
  });
 req.session.user = {
    email,
    password,
    role
  };
  res.redirect('/login');
});




router.post('/login',(req,res)=>{
    const {email,password,role}=req.body;
    const user = users.find((u)=>u.email===email&&u.password===password);
    if(!user){
        return res.send('invalid credentials!<a  href ="/login">try again</a> ')
    }
req.session.user = {
    email:user.email,
    role: user.role
};

req.session.save((err) => {
    if (err) {
      console.error("Session save error:", err);
      return res.status(500).send("Session error");
    }
if(role==="student"){
    res.redirect(303,"/student");
}else{
    res.redirect(303,"/teacher");
}
})
})








router.get('/logout',(req,res)=>{
    req.session.destroy(()=>{
        res.clearCookie('connect.sid');
        res.redirect('/login'); 
    })
});

module.exports=router;