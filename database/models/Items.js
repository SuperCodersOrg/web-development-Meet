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
    unique: [true,"email already exist"],
    lowercase:true,
    trim:true,
  },
  age:{
    type:Number,
    default : [18, 'Must be at least 18 years old'],
  },
  createdAt:{
    type:Date,
    default:Date.now
}
},{timestamps:true}

);


module.exports = mongoose.model("user",userschema);

