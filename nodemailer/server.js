require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require("path");

const app = express();


app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "frontend")));


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER, 
    pass: process.env.PASSWORD  
  },
});


app.get("/", (req, res) => {
  res.redirect("/index.html");
});

app.get("/login", (req, res) => {
  res.redirect("/login.html");
});


app.post('/login', async (req, res) => {
  const { to, subject, message } = req.body;

  
  if (!to || !subject || !message) {
    return res.status(400).json({
      success: false,
      message: "Please provide 'to', 'subject', and 'message' fields."
    });
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.USER,
      to: to,
      subject: subject,
      html: `<p>${message}</p>`,
    });



    return res.status(200).json({
      success: true,
      message: "Email sent successfully!"
    });

  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: err.message
    });
  }
});

const PORT = 3370;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));