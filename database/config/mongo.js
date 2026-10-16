const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        const connection = await mongoose.connectDB(process.env.MONGO_URL);
        console.log(`MongoDB Connected successfully: ${connection.connection.host}`);
    }
    catch(err){
console.error(`Error connecting to MongoDB: ${err.message}`);
process.exit(1);
    }
}

module.exports = {connectDB};