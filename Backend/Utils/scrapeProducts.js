const scrapeProducts = async (category) => {
    try {
        const apiKey = process.env.VITE_SCRAPING_BEE_API_KEY;
        console.log(apiKey)
        
        const targetUrl = encodeURIComponent(`https://www.flipkart.com/search?q=${category}`);
        
        const extractScript = `
            const products = [];
            const items = document.querySelectorAll('._75nlfW');
            
            items.forEach(item => {
                const brand = item.querySelector('.syl9yP')?.textContent?.trim();
                const image = item.querySelector('._53J4C-')?.getAttribute('src');
                const title = item.querySelector('.WKTcLC')?.getAttribute('title');
                const price = item.querySelector('.Nx9bqj')?.textContent?.trim();
                const link = item.querySelector('.rPDeLR')?.getAttribute('href');
                
                if (title && price) {
                    products.push({ brand, image, title, price, link });
                }
            });
            
            return products;
        `;

        const response = await fetch(`https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${targetUrl}&render_js=true&wait_for=._75nlfW&execute_js=${encodeURIComponent(extractScript)}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(`ScrapingBee API error: ${response.status}`);
        }

        return await response.json();

    } catch (error) {
        console.error('Scraping error:', error);
        throw error;
    }
};

module.exports = scrapeProducts;