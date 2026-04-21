const express = require('express')
const path=require('path')
const router=express.Router()
const bhajanRepository = require('../services/bhajanRepository.js')
const {
  scheduleAlternateLyricsMatch,
  runAlternateLyricsMatch
} = require('../services/alternateLyricsMatcher.js')

router.get('/', async(req, res) => {
  try {
    const result = await bhajanRepository.getAllBhajans()
    const processedData = result.map(({ name }) => ({ name }))
    res.render('home', { result: processedData })
  } catch (error) {
    console.error('Error loading home page:', error)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/bhajanlyrics/:name', async(req, res) =>{
  try {
    const result = await bhajanRepository.getBhajanByName(req.params.name)
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
  try {
    const result = await bhajanRepository.getAllBhajans()
    const processedData = result.map(({name, link}) => ({name, link}));
    res.render('linktoyoutube',{result:processedData})
  } catch (error) {
    console.error('Error loading YouTube links:', error)
    res.status(500).send('Internal Server Error')
  }
})

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const result = await bhajanRepository.searchBhajansByName(query)
    const processedData = result.map(({name, Bhajan}) => ({name, Bhajan}));
    res.render('search',{query,result:processedData})
  } catch (error) {
    console.error('Error searching bhajans:', error)
    res.status(500).send('Internal Server Error')
  }
});

// API Endpoints for Mobile App

// Get all bhajans (API)
router.get('/api/bhajans', async(req, res) => {
  try {
    const result = await bhajanRepository.getAllBhajans()
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single bhajan by ID (API)
router.get('/api/bhajans/:id', async(req, res) => {
  try {
    const result = await bhajanRepository.getBhajanById(req.params.id)
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
    const {
      name,
      Bhajan,
      link,
      originalName,
      originalBhajan,
      originalScript,
      alternateName,
      alternateBhajan,
      alternateScript,
      alternateStatus,
      alternateSource,
      matchConfidence
    } = req.body;
    
    const effectiveName = originalName || name;
    const effectiveBhajan = originalBhajan || Bhajan;

    if (!effectiveName || !effectiveBhajan) {
      return res.status(400).json({ success: false, error: 'Name and Bhajan lyrics are required' });
    }
    
    const newBhajan = {
      name: effectiveName,
      Bhajan: effectiveBhajan,
      originalName: effectiveName,
      originalBhajan: effectiveBhajan,
      originalScript: originalScript || 'hindi',
      alternateName: alternateName || '',
      alternateBhajan: alternateBhajan || '',
      alternateScript: alternateScript || ((originalScript || 'hindi') === 'hindi' ? 'hinglish' : 'hindi'),
      alternateStatus: alternateStatus || 'missing',
      alternateSource: alternateSource || '',
      matchConfidence: typeof matchConfidence === 'number' ? matchConfidence : null,
      link: link || ''
    };
    
    const result = await bhajanRepository.createBhajan(newBhajan)
    scheduleAlternateLyricsMatch(result._id)
    res.status(201).json({ success: true, data: result, message: 'Bhajan added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update bhajan (API)
router.put('/api/bhajans/:id', async(req, res) => {
  try {
    const {
      name,
      Bhajan,
      link,
      originalName,
      originalBhajan,
      originalScript,
      alternateName,
      alternateBhajan,
      alternateScript,
      alternateStatus,
      alternateSource,
      matchConfidence
    } = req.body;
    
    const result = await bhajanRepository.updateBhajan(
      req.params.id,
      {
        name: originalName || name,
        Bhajan: originalBhajan || Bhajan,
        originalName: originalName || name,
        originalBhajan: originalBhajan || Bhajan,
        originalScript,
        alternateName,
        alternateBhajan,
        alternateScript,
        alternateStatus,
        alternateSource,
        matchConfidence,
        link
      }
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

router.post('/api/bhajans/:id/match-alternate', async(req, res) => {
  try {
    const existing = await bhajanRepository.getBhajanById(req.params.id)
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Bhajan not found' });
    }

    scheduleAlternateLyricsMatch(req.params.id)
    res.json({
      success: true,
      data: {
        id: req.params.id,
        status: 'queued'
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
})

// Delete bhajan (API)
router.delete('/api/bhajans/:id', async(req, res) => {
  try {
    const result = await bhajanRepository.deleteBhajan(req.params.id)
    
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
