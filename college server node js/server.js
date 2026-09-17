const http = require("http");
const path = require("path");
const fs = require("fs");
const port = 3270;
const datafile = require("./data.json");
const data2Path = path.join(__dirname, "data2.json");

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/contact") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      let parsedBody = {};
      try {
        parsedBody = JSON.parse(body);
      } catch (err) {
        parsedBody = {};
      }

      fs.readFile(data2Path, "utf-8", (err, data) => {
        let currentRecords = [];

        if (!err && data && data.trim()) {
          try {
            currentRecords = JSON.parse(data);
            if (!Array.isArray(currentRecords)) {
              currentRecords = [currentRecords];
            }
          } catch (e) {
            currentRecords = [];
          }
        }

        

        fs.writeFile(data2Path, JSON.stringify(currentRecords, null, 2), "utf-8", (writeErr) => {
          if (writeErr) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "Failed to write data" }));
            return;
          }

          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "Contact details saved successfully" }));
        });
      });
    });
    return;
  }

  if (req.method === "GET") {
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/home" || req.url === "/") {
      res.statusCode = 200;
      res.end(JSON.stringify(datafile.home || datafile));
    } else if (req.url.startsWith("/courses")) {
      let split = req.url.split("/");
      if (split[2] === "bca") {
        res.statusCode = 200;
        res.end(JSON.stringify(datafile.BCA || datafile));
      } else if (split[2] === "btech") {
        res.statusCode = 200;
        res.end(JSON.stringify(datafile.BTECH || datafile));
      } else if (split[2] === "mca") {
        res.statusCode = 200;
        res.end(JSON.stringify(datafile.MCA || datafile));
      } else {
        res.statusCode = 200;
        res.end(JSON.stringify(datafile.courses || datafile));
      }
    } else if (req.url === "/about") {
      res.statusCode = 200;
      res.end(JSON.stringify(datafile.about || datafile));
    } else if (req.url === "/students") {
      res.statusCode = 200;
      res.end(JSON.stringify(datafile.students || datafile));
    } else if (req.url === "/facilities") {
      res.statusCode = 200;
      res.end(JSON.stringify(datafile.facilities || datafile));
    } else if (req.url === "/placements") {
      res.statusCode = 200;
      res.end(JSON.stringify(datafile.placements || datafile));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Route not found" }));
    }
  }
});

server.listen(port, () => {
  console.log("Server Running on port " + port);
});