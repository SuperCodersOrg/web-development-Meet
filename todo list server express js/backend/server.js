const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const dataPath = path.join(__dirname,'backend','data.json');


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


app.post('/addbtn',(req,res)=>{
    const newdata=req.body;
    fs.readFile(dataPath,"utf-8",(err,data)=>{
        let records =[];
        if(!err && data){
try{
    records=JSON.parse(data);
}catch(e){
    records=[];
}
        }
        records.push(newdata);
        fs.writeFile(dataPath,JSON.stringify(records,null,2),(err)=>{
            if(err){
                res.status(500).send(JSON.stringify({error:"failed to write data"}));
                return;
            }
            res.status(201).send(JSON.stringify({messege:"data saved "}));
        })
    })
})








app.listen(3370, () => {
  console.log("server is running");
});
