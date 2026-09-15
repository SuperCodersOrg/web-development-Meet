const http = require("http");
const path = require("path");
const fs = require("fs");
const port = 3270;
const datafile = path.join(__dirname, "data.json");

console.log(datafile);
const server = http.createServer((req, res) => {
  if (req.url === "/style.css" && req.method === "GET") {
    res.statusCode = 200;
    let csspath = path.join(__dirname, "frontend", "style.css");
    fs.readFile(csspath, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("INTERNAL SERVER ERROR");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/css");
      res.end(data);
    });
    return;
  }
  if (req.method === "POST" && req.url === "/students") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const formData = JSON.stringify(body);
      fs.readFile(datafile, "utf-8", (err, data) => {
        let value = [];
        if (!err && formData) {
          value = JSON.parse(data);
        }
        value.push(formData);
        fs.writeFile(datafile, JSON.stringify(value, null, 2), (err) => {
          if (err) {
            res.statusCode = 500;
            res.end("ERROR READING THIS FILE");
            return;
          }
          res.statusCode = 201;
          res.setHeader("Content-Type", "application/json");
          res.end(
            JSON.stringify({
              message: "Contact stored successfully",
            }),
          );
        });
      });
    });
    return;
  }

  if (req.method === "GET") {
    let filePathMain;
    if (req.url === "/") {
      filePathMain = "index.html";
    } else if (req.url === "/about") {
      filePathMain = "about.html";
    } else if (req.url.startsWith("/courses")) {
      let split = req.url.split("/");
      if (split[2] === "bca") filePathMain = "bca.html";
      else if (split[2] === "btech") filePathMain = "btech.html";
      else {
        filePathMain = "courses.html";
      }
    } else if (req.url === "/courses") {
      filePathMain = "courses.html";
    } else if (req.url === "/list") {
      filePathMain = "data.json";
      let fullPath = path.join(__dirname, "frontend", filePathMain);
      fs.readFile(fullPath, "utf-8", (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("INTERNAL SERVER ERROR");
          return;
        } else {
          res.statusCode = 200;
          res.setHeader("Content-Type", "text/html");

          res.end(JSON.stringify(data));
        }
      });
    } else if (req.url === "/facilities") {
      filePathMain = "facilities.html";
    } else if (req.url === "/placement") {
      filePathMain = "placement.html";
    } else if (req.url === "/students") {
      filePathMain = "students.html";
    } else if (req.url === "/contact") {
      filePathMain = "contact.html";
    } else {
      res.statusCode = 404;
      res.end("PAGE NOT FOUND");
      return;
    }

    let fullPath = path.join(__dirname, "frontend", filePathMain);
    fs.readFile(fullPath, "utf-8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("INTERNAL SERVER ERROR");
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    });
  }
});
server.listen(port, () => {
  console.log("Server Running");
});
