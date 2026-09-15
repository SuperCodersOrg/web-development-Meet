const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const datafile = path.join(__dirname,'data.json');

// 1. Static files 
app.use(express.static(path.join(__dirname, 'public')));

// URL encoded body 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Helper function to serve views
const renderView = (res, fileName) => {
  res.sendFile(path.join(__dirname, 'views', index.html));
};



// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'views', 'index.html'));
});

// Home page
app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname,'views', 'index.html'));
});

// About page
app.get('/about', (req, res) => {
   res.sendFile(path.join(__dirname,'views', 'about.html'));
});

// Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname,'views', 'contact.html'));
});
//facilities
app.get('/facilities', (req, res) => {
  res.sendFile(path.join(__dirname,'views', 'facilities.html'));
});
// placement
app.get('/placement', (req, res) => {
  res.sendFile(path.join(__dirname,'views', 'placement.html'));
});
  app.get('/courses/:course',(req,res)=>{

  const course = req.params.course; 
 

        if(course==='bca')
            res.sendFile(path.join(__dirname,'views', 'bca.html'));

        else if(course==='btech')
           res.sendFile(path.join(__dirname,'views', 'btech.html'));
            else{
               res.sendFile(path.join(__dirname,'views', 'courses.html'));
            }
  }) ;
          
      app.get('/courses', (req, res) => {
  res.sendFile(path.join(__dirname,'views', 'courses.html'));
});
 app.get('/students', (req, res) => {
  res.sendFile(path.join(__dirname,'views', 'students.html'));
});
      
// Contact form submission 
app.post('/students', (req, res) => {
  console.log(req.body);
  
  res.send('<h3>Thank you! </h3>');
});

// 404 Page 
app.use((req, res) => {
  res.status(404).send('<h2>404 - Page Not Found</h2><a href="/home">Go to Home</a>');
});

// Start Server
app.listen(3300, () => {
  console.log('server is running');
});