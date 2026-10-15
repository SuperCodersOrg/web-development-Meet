const express = require("express");
const fs = require("fs/promises");
const cookieParser = require("cookie-parser");

const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "frontend")));
app.use(express.json());
const {checkauth} = require("./middlewares/middleware.js");

async function appendData(gmail, username, password) {
    try {
        let id = Date.now();;
        
        let fileContent = await fs.readFile("ids.json", "utf8");
      
        let dataArray = fileContent ? JSON.parse(fileContent) : [];

        let newCred = {
            sessionid: id,
            gmail: gmail,
            username: username,
            password: password
        };
        

        dataArray.push(newCred);
        

        await fs.writeFile("ids.json", JSON.stringify(dataArray, null, 2));
        
        console.log('Content appended successfully!');
        return id;
    } catch (error) {
        console.error('Error:', error);
    }
}



app.get("/", (req, res) => {
  res.redirect("index.html");
});
app.get("/login", (req, res) => {
  res.redirect("login.html");
});
app.post("/login",async (req, res, next) => {

  const { gmail, password } = req.body;
  // console.log(gmail, password);
  let users  = await fs.readFile("ids.json", "utf8");
let musers = users ? JSON.parse(users) : [];
  const user = musers.find(
    (u) =>
     u.password === password && u.gmail ===gmail,
  );
  console.log(user);
  if (user ===undefined) {
    return res.json({ message: "invalid credentials", success: "false" });
  }

 


});

app.post("/signup", async (req, res, next) => {
  const { username, password, gmail } = req.body;

let users  = await fs.readFile("ids.json", "utf8");
let musers = users ? JSON.parse(users) : [];

  const user = musers.find(
    (u) => u.username === username && u.password === password &&u.gmail===gmail
  );

  if (user) { console.log(123)
    return  res.json({ message: "already signup", success: "false" });
  
  }

 let sessionid =  appendData(gmail,username,password);
 console.log(sessionid);
   res.cookie("accesscookie", sessionid, {
      httpOnly: true,
      maxAge: 24 * 1000 * 60 * 60,
    });
  res.json({ message: "sigin in successfull", success: "true" });
  next();
});

app.get("/signup", (req, res) => {
  res.redirect("signin.html");
});

app.get("/logout", (req, res) => {
 res.clearCookie("accesscookie")
    res.redirect("index.html");
  });









app.listen(3300, () => {
  console.log("server is running");
});
