const scrapeProducts = async (category) => {
    try {
        const apiKey = process.env.VITE_SCRAPING_BEE_API_KEY;
        const targetUrl = `https://www.flipkart.com/search?q=${category}`;
        
        const response = await fetch(`https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${encodeURIComponent(targetUrl)}`, {
            method: 'GET',
            params: {
                'render_js': true,
                'premium_proxy': true,
                'browser_instructions': JSON.stringify({
                    pageFunction: async () => {
                        await page.waitForSelector('._75nlfW');
                        
                        return page.evaluate(() => {
                            const products = [];
                            document.querySelectorAll('._75nlfW').forEach(el => {
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
                        });
                    }
                })
            }
        });

        if (!response.ok) {
            throw new Error(`ScrapingBee returned ${response.status}: ${await response.text()}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Scraping error:', error);
        throw error;
    }
};

module.exports = scrapeProducts;