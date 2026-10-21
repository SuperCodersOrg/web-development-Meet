const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const Item = require('./models/Items');
const connectDB = require('./config/mongo');


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

 connectDB();
app.use(express.json());
app.use(cors());


app.post('signup', async (req, res) => {
  try {
    const { username,password,gmail} = req.body;
    
    
    const newItem = await Item.create({ username,password,gmail });
    
    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: newItem,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});


app.post('signup/many', async (req, res) => {
  try {

    const itemsArray = req.body.items;

    if (!Array.isArray(itemsArray) || itemsArray.length === 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Please provide an array of items under the "items" key' 
      });
    }


    const insertedItems = await Item.insertMany(itemsArray);

    res.status(201).json({
      success: true,
      count: insertedItems.length,
      message: `${insertedItems.length} items created successfully`,
      data: insertedItems,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});


app.post('login', async (req, res) => {
  try { const {gmail,password} = req.body
    const items = await Item.find({gmail});
    res.status(200).json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    
    if (!item) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }
    
    res.status(200).json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.put('/api/items/:id', async (req, res) => {
  try {
    const {username,password,gmail } = req.body;

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      { username,password,gmail },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});


app.delete('/api/items/:id', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.status(200).json({ success: true, message: 'Item deleted successfully', data: deletedItem });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});



app.listen(port,()=>{
    console.log("Server is live on port : ",port);
})
