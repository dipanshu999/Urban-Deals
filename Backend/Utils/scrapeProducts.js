const scrapeProducts = async (category) => {
    try {
        const apiKey = process.env.SCRAPINGBEE_API_KEY;
        if (!apiKey) {
            throw new Error('ScrapingBee API key not found');
        }

        const targetUrl = encodeURIComponent(`https://www.flipkart.com/search?q=${category}`);
        const scrapingBeeUrl = `https://app.scrapingbee.com/api/v1/`;

        console.log('API Key:', apiKey.slice(0, 5) + '...'); // Log first 5 chars for verification
        
        const response = await fetch(scrapingBeeUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            params: {
                api_key: apiKey,
                url: targetUrl,
                render_js: true,
                wait_for: '._75nlfW',
                extract_rules: {
                    products: {
                        selector: "._75nlfW",
                        type: "list",
                        output: {
                            brand: ".syl9yP | text",
                            image: "._53J4C- | attr:src",
                            title: ".WKTcLC | attr:title",
                            price: ".Nx9bqj | text",
                            link: ".rPDeLR | attr:href"
                        }
                    }
                }
            }
        });

        console.log('Response status:', response.status);
        const data = await response.text();
        console.log('Response data:', data);

        if (!response.ok) {
            throw new Error(`ScrapingBee API error: ${response.status} - ${data}`);
        }

        return JSON.parse(data);

    } catch (error) {
        console.error('Scraping error:', error);
        throw error;
    }
};

module.exports = scrapeProducts;