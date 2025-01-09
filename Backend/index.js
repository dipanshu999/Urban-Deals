const express = require('express');
const cors = require('cors');
const app = express();
const scrapeProducts=require('./Utils/scrapeProducts')

// Configure CORS with specific options
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS.split(','), // frontend URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Enable credentials (cookies, authorization headers, etc.)
};

// Apply configured CORS middleware
app.use(cors(corsOptions));
app.use(express.json());


app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});


app.get('/api/scrape', async (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ error: 'Category is required' });
  }
  
  try {
    const products = await scrapeProducts(category);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to scrape products' });
  }
});

module.exports = app;