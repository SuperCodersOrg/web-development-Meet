// // Simple multer implementation 



// const express = require('express');
// const multer = require('multer');
// const fileupload = multer({dest : 'userFiles/'});
// const app = express();
// let port = 3300;
// app.use('/userFiles', express.static('userFiles'));


// app.set('view engine', 'ejs');

// app.get('/',(req,res)=>{
//     res.render('index',{
//         uploadedfile : ""
//     });
// })

// app.get('/multiple',(req,res)=>{
// res.render('multiple',{
//     uploadedfile : []
// });
// })

// app.post('/profile',fileupload.single('imageFile'),(req,res)=>{

//     console.log(req.file);
//     console.log(req.body);

//     res.render('index',{
//         uploadedfile : req.file.filename
//     });
// })


// app.post('/multiple',fileupload.array('imageFile',10),(req,res)=>{

//     console.log(req.files);
//     console.log(req.body);

//     res.render('multiple',{
//         uploadedfile : req.files
//     });
// })
// app.listen(port,()=>{
//     console.log("Server is live on port : ",port);
// })



// Multer impleentation using disk storage 
const { error } = require('console');
const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
let port = 3300;

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null,path.join(__dirname,'userFiles'));
    },
    filename : (req,file,cb)=>{
        cb(null,file.originalname);
    },
})
const fileupload = multer({
    storage : storage,
    fileFilter : (req,file,cb)=>{
        const extention = path.extname(file.originalname).toLowerCase();
        const allowedTypes = [".jpg",".png",".jpeg"];


        if(allowedTypes.includes(extention)){
            cb(null,true);
        }
        else {
            cb(new Error("Please use correct extention of file 'jpg' , 'png' and 'jpeg'"))
        }

    }
});




app.use('/userFiles', express.static('userFiles'));


app.set('view engine', 'ejs');

app.get('/',(req,res)=>{
    res.render('index',{
        uploadedfile : ""
    });
})

app.get('/multiple',(req,res)=>{
res.render('multiple',{
    uploadedfile : []
});
})

app.post('/profile',fileupload.single('imageFile'),(req,res)=>{

    console.log(req.file);
    console.log(req.body);

    res.render('index',{
        uploadedfile : req.file.filename
    });
})


app.post('/multiple',fileupload.array('imageFile',10),(req,res)=>{

    console.log(req.files);
    console.log(req.body);

    res.render('multiple',{
        uploadedfile : req.files
    });
})


app.listen(port,()=>{
    console.log("Server is live on port : ",port);
})