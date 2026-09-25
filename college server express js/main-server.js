const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const datafile = require("./data.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// Root route
app.get("/", (req, res) => {
  res.send(JSON.stringify(datafile.home));
});

// Home page
app.get("/home", (req, res) => {
  res.send(JSON.stringify(datafile.home));
});

// About page
app.get("/about", (req, res) => {
  res.send(JSON.stringify(datafile.home));
});

// Contact page

//facilities
app.get("/facilities", (req, res) => {
  res.send(JSON.stringify(datafile.facilities));
});
// placement
app.get("/placements", (req, res) => {
  res.send(JSON.stringify(datafile.placements));
});
app.get("/courses/:course", (req, res) => {
  const course = req.params.course;

  if (course === "bca") res.send(JSON.stringify(datafile.BCA));
  else if (course === "btech") res.send(JSON.stringify(datafile.BTECH));
  else {
    res.send(JSON.stringify(datafile.MCA));
  }
});

app.get("/courses", (req, res) => {
  res.send(JSON.stringify(datafile.courses));
});
app.get("/students", (req, res) => {
  res.send(JSON.stringify(datafile.students));
});

app.post("/contact", (req, res) => {
const data2Path = path.join(__dirname,'data2.json');

  const newdata = req.body;
  // console.log(req.body);
        fs.readFile(data2Path, "utf-8", (err, data) => {
          let currentRecords = [];
  
          if (!err && data ) {
            try {
              currentRecords = JSON.parse(data);
             
            } catch (e) {
              currentRecords = [];
            }
          }
  currentRecords.push(newdata);
          
  
          fs.writeFile(data2Path, JSON.stringify(currentRecords, null, 2), (writeErr) => {
            if (writeErr) {
            
        
              res.status(500).send(JSON.stringify({ error: "Failed to write data" }));
              return;
            }
  
          
            res.status(201).send(JSON.stringify({ message: "Contact details saved successfully" }));
          });
        });
      
    

});

app.use((req, res) => {
  res.status(404)
    .send('<h2>404 - Page Not Found</h2><a href="/home">Go to Home</a>');
});

app.listen(3300, () => {
  console.log("server is running");
});