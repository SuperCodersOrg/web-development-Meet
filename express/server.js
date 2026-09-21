const express = require("express");
const cors = require('cors');
const app = express();

app.use(express.json);
app.use(express.static("public"));
app.use(use());
const studentroutes = require('./routes/student');
const teacherroutes = require('./routes/teacher');


app.use('/student',studentroutes);
app.use('/teacher',teacherroutes);

app.listen(3300,()=>{
    console.log("server is running");
})