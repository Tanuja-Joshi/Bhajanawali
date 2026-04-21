const express = require('express')
const path=require('path')
const router=express.Router()
const bhajanModel=require('../models/bhajanSchema.js')

router.get('/', async(req, res) => {
  const result = await bhajanModel.find({}, 'name'); // Get only the 'name' field
  if(result){
    const processedData = result.map(({ name}) => ({ name}));
    res.render('home',{result:processedData})
   }
  })

router.get('/bhajanlyrics/:name', async(req, res) =>{
  try {
    const result = await bhajanModel.findOne({ name: req.params.name}).sort({name:1});
    if (result) {
      res.render('bhajanlyrics', {
        name: result.name,
        Bhajan: result.Bhajan
      });
    } else {
      res.status(404).send('Bhajan not found');
    }
  } catch (error) {
    console.error('Error fetching bhajan:', error);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/linktoyoutube', async(req, res) =>{
  const result = await bhajanModel.find({}, 'name link').sort({name:1}); // Get only the 'name and link' field
  if(result){
    const processedData = result.map(({name, link}) => ({name, link}));
    res.render('linktoyoutube',{result:processedData})
   }
  })

router.get('/search', async (req, res) => {
  const query = req.query.query; // Assuming the query parameter is named 'query'
  const result = await bhajanModel.find({ name: { $regex: new RegExp(query, 'i') } });
  if(result){
    const processedData = result.map(({name, Bhajan}) => ({name, Bhajan}));
    res.render('search',{query,result:processedData})
   }
});

// API Endpoints for Mobile App

// Get all bhajans (API)
router.get('/api/bhajans', async(req, res) => {
  try {
    const result = await bhajanModel.find({}).sort({name:1});
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single bhajan by ID (API)
router.get('/api/bhajans/:id', async(req, res) => {
  try {
    const result = await bhajanModel.findById(req.params.id);
    if (result) {
      res.json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, error: 'Bhajan not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add new bhajan (API)
router.post('/api/bhajans', async(req, res) => {
  try {
    const { name, Bhajan, link } = req.body;
    
    if (!name || !Bhajan) {
      return res.status(400).json({ success: false, error: 'Name and Bhajan lyrics are required' });
    }
    
    const newBhajan = new bhajanModel({
      name,
      Bhajan,
      link: link || ''
    });
    
    const result = await newBhajan.save();
    res.status(201).json({ success: true, data: result, message: 'Bhajan added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update bhajan (API)
router.put('/api/bhajans/:id', async(req, res) => {
  try {
    const { name, Bhajan, link } = req.body;
    
    const result = await bhajanModel.findByIdAndUpdate(
      req.params.id,
      { name, Bhajan, link },
      { new: true }
    );
    
    if (result) {
      res.json({ success: true, data: result, message: 'Bhajan updated successfully' });
    } else {
      res.status(404).json({ success: false, error: 'Bhajan not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete bhajan (API)
router.delete('/api/bhajans/:id', async(req, res) => {
  try {
    const result = await bhajanModel.findByIdAndDelete(req.params.id);
    
    if (result) {
      res.json({ success: true, data: result, message: 'Bhajan deleted successfully' });
    } else {
      res.status(404).json({ success: false, error: 'Bhajan not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports =router