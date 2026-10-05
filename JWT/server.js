const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());
const path = require("path");
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "frontend")));

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwtkey@123";

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN || "accesstoken";

const users = [
  {
    username: "meet",
    password: "meet@123",
  },
  {
    username: "meet",
    password: "meet@1230",
  },
];

function setToken(user) {
  const token = jwt.sign({ username: user.username }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
  return token;
}

app.get("/", (req, res) => {
  res.redirect("index.html");
});

app.get("/login", (req, res) => {
  res.redirect("/login.html");
});

app.get("/signup", (req, res) => {
  res.redirect("signin.html");
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("index.html");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) {
    return res.json({ message: "invalid credentials", success: "false" });
  }
  return res.json({ success: true, token: "your_jwt_token" });

  const token = setToken(user);

  res.cookie(JWT_SECRET_TOKEN, token, {
    httpOnly: true,
    maxAge: 24 * 1000 * 60 * 60,
  });
});

app.post("/signup", (req, res, next) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) {
    return res.json({ message: "invalid credentials", success: "false" });
  }

  return res.json({ success: true, token: "your_jwt_token" });

  const token = setToken(user);

  res.cookie(JWT_SECRET_TOKEN, token, {
    httpOnly: true,
    maxAge: 24 * 1000 * 60 * 60,
  });

  next();
});

app.listen(3000, () => {
  console.log("server is running");
});
