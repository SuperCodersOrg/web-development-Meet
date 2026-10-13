const mongoose = require("mongoose");
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
  },
  age:{
    type:Number,
    default : [18, 'Must be at least 18 years old'],
  },
  createdAt:{
    type:Date,
    default:Date.now
}
},

);


module.exports = mongoose.exports("user",userschema);

