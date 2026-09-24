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


app.use(session({
    secret: 'meetkey123',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 1000 * 60 * 30,
        httpOnly: true 
    }
}));












app.listen(3300, () => {
  console.log("server is running");
});

