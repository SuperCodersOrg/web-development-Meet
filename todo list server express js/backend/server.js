const express = require("express");
const cors = require("cors")
const path = require("path");
const fs = require("fs");
const { METHODS } = require("http");
const app = express();
const dataPath = path.join(__dirname, "data.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//CORS config - DELETE allowed
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// app.use(cors({
//   origin:'http://127.0.0.1:5500',

// }));

function readData() {
  if (!fs.existsSync(dataPath)) return [];
  const text = fs.readFileSync(dataPath, "utf-8");
  if (!text || text.trim() === "") return [];
  try {
    return JSON.parse(text);
  } catch (err) {
    console.error("JSON parse error:", err);
    return [];
  }
}

function writeData(data) {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

// 1. GET: 
app.get("/addtask", (req, res) => {
  const records = readData();
  const visible = records.filter((item) => item.isDeleted !== true);
  res.json(visible);
});

// 2. POST: 
app.post("/addbtn", (req, res) => {
  const records = readData();
  records.push(req.body);
  writeData(records);
  res.json({ message: "Task added" });
});

// 3. DELETE METHOD:
app.delete("/task/delete/:id", (req, res) => {
  const targetId = String(req.params.id);
  const records = readData();

  for (let i = 0; i < records.length; i++) {
    if (String(records[i].id) === targetId) {
      records[i].isDeleted = true;
      break;
    }
  }

  writeData(records);
  res.json({ success: true, message: "Task  deleted" });
});

// 4. PATCH: 
app.patch("/task/status/:id", (req, res) => {
  const targetId = String(req.params.id);
  const { isDone } = req.body;
  const records = readData();

  for (let i = 0; i < records.length; i++) {
    if (String(records[i].id) === targetId) {
      records[i].isDone = Boolean(isDone);
      break;
    }
  }

  writeData(records);
  res.json({ success: true, message: "Status updated" });
});

// 5. PUT: 
app.put("/task/edit/:id", (req, res) => {
  const targetId = String(req.params.id);
  const { title, description } = req.body;
  const records = readData();

  for (let i = 0; i < records.length; i++) {
    if (String(records[i].id) === targetId) {
      records[i].title = title;
      records[i].description = description;
      break;
    }
  }

  writeData(records);
  res.json({ success: true, message: "Task updated" });
});

app.listen(3370, () => {
  console.log("Server running on http://localhost:3370");
});