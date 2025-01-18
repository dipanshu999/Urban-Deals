const scrapeProducts = async (category) => {
    try {
        const apiKey = process.env.SCRAPINGBEE_API_KEY;
        if (!apiKey) throw new Error('ScrapingBee API key not found');

        const targetUrl = `https://www.flipkart.com/search?q=${category}`;
        const url = `https://app.scrapingbee.com/api/v1/?api_key=${apiKey}&url=${encodeURIComponent(targetUrl)}&render_js=true&wait_for=._75nlfW`;

        const response = await fetch(url);
        if (!response.ok) {
            const error = await response.text();
            throw new Error(`ScrapingBee API error: ${response.status} - ${error}`);
        }

        const html = await response.text();
        console.log('Response received:', html.slice(0, 100)); // Log first 100 chars

        return html;
    } catch (error) {
        console.error('Scraping error:', error);
        throw error;
    }
};

module.exports = scrapeProducts;