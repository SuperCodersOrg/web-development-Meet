

require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const {isloggedIn} = require("./middleware/middleware.js");

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.set("view engine", "ejs");

const transporter = nodemailer.createTransport({
  service: "gmail",
  family: 4,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

const JWT_SECRET_KEY = "jwtkey@123";
const JWT_SECRET_TOKEN =  "accesstoken";

function setToken(user) {
  const token = jwt.sign({ username: user.username }, JWT_SECRET_KEY, {
    expiresIn: "1h", 
  });
  return token;
}


app.get("/", (req, res) => {
  res.render("index.ejs", { data: "entered" });
});

app.get("/login", (req, res) => {
  res.render("login.ejs", { data: "entered" });
});
app.get("/reset", (req, res) => {
  res.render("reset.ejs", { data: "entered" });
});

app.get("/forgot", (req, res) => {
  res.render("forgot.ejs", { data: "entered" });
});

app.get("/signup", (req, res) => {
  res.render("signup.ejs", { data: "entered" });
});


app.get("/profile", isloggedIn, (req, res) => {
  res.render("profile.ejs", { data: "entered" });
});

app.post("/login", async (req, res) => {
  try {
    const { username ,password} = req.body;
    
    if (!username ||!password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username.",
      });
    }

    let file = await fs.readFile("data.json", "utf8");
    let dataarr = JSON.parse(file);


    let user = dataarr.find((a) => a.username === username && a.password === password);
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }


    const token = setToken(user);

   
    res.cookie(JWT_SECRET_TOKEN, token, {
      httpOnly: true,
      maxAge: 24 * 1000 * 60 * 60,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful!",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

app.post("/forgot", async (req, res) => {
  try {
    const { username } = req.body;
    
    if (!username ) {
      return res.status(400).json({
        success: false,
        message: "Please provide username.",
      });
    }

    let file = await fs.readFile("data.json", "utf8");
    let dataarr = JSON.parse(file);


  let user = dataarr.find((a) => a.gmail === username || a.username === username);
    
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }
 const message = "http://localhost:3000/reset";

    const token = setToken(user);

   
    res.cookie(JWT_SECRET_TOKEN, token, {
      httpOnly: true,
      maxAge: 24 * 1000 * 60 * 60,
    });

    const info = await transporter.sendMail({
      from: process.env.USER,
      to: username,
      subject: "Password Reset Link",
      html: `<a href="${message}">Click here to reset password</a>`,
    });
    return res.status(200).json({
      success: true,
      message: "forgot successful!",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
app.post("/signup", async (req, res) => {
  try {
    const { username, gmail, password } = req.body;
console.log(username,gmail)
    if (!username || !gmail) {
      return res.status(400).json({
        success: false,
        message: "Please provide all details.",
      });
    }

    let file = await fs.readFile("data.json", "utf8");
    let dataarr = JSON.parse(file);

    
    let existingUser = dataarr.find((a) => a.username === username || a.gmail === gmail);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Username or email already present.",
      });
    }

   
    const newUser = { username, gmail, password };
    dataarr.push(newUser);
    await fs.writeFile("data.json", JSON.stringify(dataarr, null, 2));

  
    const token = setToken(newUser);
    res.cookie(JWT_SECRET_TOKEN, token, {
      httpOnly: true,
      maxAge: 24 * 1000 * 60 * 60,
    });

    return res.status(200).json({
      success: true,
      message: "Signup successful!",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


app.get("/logout", (req, res) => {
  res.clearCookie(JWT_SECRET_TOKEN);
  res.render("index.ejs", { data: "entered" });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});