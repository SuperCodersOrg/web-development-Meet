const express = require("express");



const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.json());

const users = [
  {
    username: "meet",
    password: "meet@123",
    role: "student",
  },
  {
    username: "meet",
    password: "meet@1230",
    role: "teacher",
  },
];

function setid(){
    let  id = newDate();
app.use(
  session({
    secret: "meet@123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);
}


app.get("/", (req, res) => {
  res.redirect("index.html");
});
app.get("/login", (req, res) => {
  res.redirect("login.html");
});
app.post("/login", (req, res, next) => {

  const { username, password } = req.body;
  console.log(username, password);
  const user = users.find(
    (u) =>
      u.username === username && u.password === password && u.role == "student",
  );
  console.log(user);
  if (!user) {
    return res.json({ message: "invalid credentials", success: "false" });
  }

  console.log(user.role);


});

app.post("/signup", (req, res, next) => {
  const { username, password, role } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password,
  );
  if (!user) {
    return res.json({ message: "invalid credentials", success: "false" });
  }

  
  res.json({ message: "sigin in successfull", success: "true" });
  next();
});

app.get("/signup", (req, res) => {
  res.redirect("signin.html");
});

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.redirect("index.html");
  });
});

app.use((req, res, next) => {

  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
});





app.listen(3300, () => {
  console.log("server is running");
});
