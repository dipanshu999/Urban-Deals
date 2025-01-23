const axios = require('axios');  
const { JSDOM } = require('jsdom'); // For DOM parsing

const scrapeProducts = async (category) => {
  try {
    const apiKey = process.env.ZENROWS_API_KEY; // Ensure your ZenRows API Key is added in .env
    if (!apiKey) throw new Error('ZenRows API Key is missing');

    // Construct the target Flipkart URL
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

    // Extract product data based on your class selectors
    const products = [];
    const items = document.querySelectorAll('._75nlfW'); // Adjusted selector

    items.forEach((el) => {
      const product = {
        brand: el.querySelector('.syl9yP')?.textContent?.trim() || '', // Adjusted brand selector
        image: el.querySelector('._53J4C-')?.getAttribute('src') || '', // Adjusted image selector
        title: el.querySelector('.WKTcLC')?.getAttribute('title') || '', // Adjusted title selector
        price: el.querySelector('.Nx9bqj')?.textContent?.trim() || '', // Adjusted price selector
        link : `https://www.flipkart.com${el.querySelector('.rPDeLR')?.getAttribute('href')}` || '', // Adjusted link selector
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
