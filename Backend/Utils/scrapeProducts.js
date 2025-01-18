// If using Node.js < 18, uncomment the next line:
// const fetch = require('node-fetch');

const scrapeProducts = async (category) => {
    try {
        const apiKey = process.env.VITE_SCRAPING_BEE_API_KEY;
        const targetUrl = `https://www.flipkart.com/search?q=${category}`;

        const response = await fetch('https://app.scrapingbee.com/api/v1/', {
            method: 'GET',
            headers: {
                'Accept': 'text/html'
            },
            params: {
                api_key: apiKey,
                url: targetUrl,
                wait: '3000',
                block_resources: false,
                wait_for: '._75nlfW' // Wait for product containers
            }
        });

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        const products = [];
        doc.querySelectorAll('._75nlfW').forEach(el => {
            const brand = el.querySelector('.syl9yP')?.textContent?.trim();
            const image = el.querySelector('._53J4C-')?.getAttribute('src');
            const title = el.querySelector('.WKTcLC')?.getAttribute('title');
            const price = el.querySelector('.Nx9bqj')?.textContent?.trim();
            const link = el.querySelector('.rPDeLR')?.getAttribute('href');
            
            if (title && price) {
                products.push({ brand, image, title, price, link });
            }
        });

        return products;
    } catch (error) {
        console.error('Scraping error:', error);
        throw error;
    }
};

module.exports = scrapeProducts;