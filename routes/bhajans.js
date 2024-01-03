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
// router.get('/bhajans', async (req, res) => {
//   const result= await bhajanModel.find()
//   console.log(result)
//   if(result){
//    const processedData = result.map(({ Bhajan }) => ({ Bhajan }));
//    res.render('bhajans',{result:processedData})
//   }
// })

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

module.exports =router