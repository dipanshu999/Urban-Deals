const axios = require('axios');

const scrapeProducts = async (category) => {
    try {
        const apiKey = process.env.SCRAPING_BEE_API_KEY;
        const targetUrl = `https://www.flipkart.com/search?q=${category}`;
        
        const response = await axios.get('https://app.scrapingbee.com/api/v1/', {
            params: {
                api_key: apiKey,
                url: targetUrl,
                wait: '1000',
                block_resources: false
            }
        });

        const html = response.data;
        const products = [];

        // Use regex or DOM parser to extract product data
        const productElements = html.match(/<div class="_75nlfW".*?<\/div>/g) || [];

        productElements.forEach(element => {
            const brand = element.match(/class="syl9yP">(.*?)</) || '';
            const image = element.match(/class="_53J4C-" src="(.*?)"/) || '';
            const title = element.match(/class="WKTcLC" title="(.*?)"/) || '';
            const price = element.match(/class="Nx9bqj">(.*?)</) || '';
            const link = element.match(/class="rPDeLR" href="(.*?)"/) || '';

            if (title && price) {
                products.push({
                    brand: brand[1] || '',
                    image: image[1] || '',
                    title: title[1] || '',
                    price: price[1] || '',
                    link: link[1] || ''
                });
            }
        });

        return products;
    } catch (error) {
        console.error('Scraping error:', error);
        throw error;
    }
};

module.exports = scrapeProducts;