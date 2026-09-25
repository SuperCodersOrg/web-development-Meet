const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/home',(req,res)=>{
    res.render("home",{title:"home page"});
});

app.get('/about',(req,res)=>{
    res.render("about",{title:"about page"});
});

app.listen(2000,()=>{
    console.log("server is running");
})












app.listen(3300, () => {
  console.log("server is running");
});

