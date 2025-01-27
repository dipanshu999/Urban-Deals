const axios = require('axios');  
const { JSDOM } = require('jsdom'); // For DOM parsing

const scrapeProducts = async (category) => {

  const selectors = {
    "men's clothing": {
      brandSelector: '.syl9yP',
      imageSelector: '._53J4C-',
      titleSelector: '.WKTcLC',
      linkSelector: '.rPDeLR',
      priceSelector: '.Nx9bqj',
    },

    "women's clothing": {
      brandSelector: '.syl9yP',
      imageSelector: '._53J4C-',
      titleSelector: '.WKTcLC',
      linkSelector: '.rPDeLR',
      priceSelector: '.Nx9bqj',
    },

    "electronics": {
      imageSelector: '.DByuf4',
      titleSelector: '.wjcEIp',
      linkSelector: '.VJA3rP',
      priceSelector: '.Nx9bqj',
    },
  };

  const categorySelectors = selectors[category];

  // Handle missing category or selectors
  if (!categorySelectors) {
    throw new Error(`Selectors not defined for category: ${category}`);
  }

  try {
    const apiKey = process.env.ZENROWS_API_KEY;
    if (!apiKey) throw new Error('ZenRows API Key is missing');

    const targetUrl = `https://www.flipkart.com/search?q=${category}`;

    // ZenRows API URL with JavaScript rendering enabled
    const zenRowsUrl = `https://api.zenrows.com/v1/?apikey=${apiKey}&url=${encodeURIComponent(
      targetUrl
    )}&js_render=true`;

    // Fetch the rendered HTML from ZenRows
    const response = await axios.get(zenRowsUrl);

    // Get the HTML content from Axios response
    const html = response.data; // Axios uses `data` for the response body

    // Parse HTML using jsdom
    const { document } = new JSDOM(html).window;

    const products = [];
    const items = document.querySelectorAll('._75nlfW'); // Adjusted selector

    items.forEach((el) => {
      const product = {
        brand: el.querySelector(categorySelectors.brandSelector)?.textContent?.trim() || '', // Adjusted brand selector
        image: el.querySelector(categorySelectors.imageSelector)?.getAttribute('src') || '', // Adjusted image selector
        title: el.querySelector(categorySelectors.titleSelector)?.getAttribute('title') || '', // Adjusted title selector
        price: el.querySelector(categorySelectors.priceSelector)?.textContent?.trim() || '', // Adjusted price selector
        link : `https://www.flipkart.com${el.querySelector(categorySelectors.linkSelector)?.getAttribute('href')}` || '', // Adjusted link selector
      };

      if (product.title && product.price) {
        products.push(product);
      }
    });

    return products;
  } catch (error) {
    console.error('Scraping error:', error.message);
    throw error;
  }
};

module.exports = scrapeProducts;
