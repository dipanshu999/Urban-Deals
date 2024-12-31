const puppeteer = require('puppeteer');

const scrapeProducts = async (category) => {
  try {
    const browser = await puppeteer.launch({
      headless: 'new', // Use the new headless mode
    });

    const page = await browser.newPage();

    // Set a user agent to mimic a real browser
    await page.setUserAgent(
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    );

    const url = `https://www.flipkart.com/search?q=${category}`;

    await page.goto(url, {
      waitUntil: 'networkidle2',
      timeout: 60000, // Increase timeout to 60 seconds
    });

    // Wait for product elements to load
    await page.waitForSelector('._75nlfW', { timeout: 10000 });

    const products = await page.evaluate(() => {
      const productElements = document.querySelectorAll('._75nlfW');
      const scrapedProducts = [];

      productElements.forEach((product) => {
        const title = product.querySelector('.syl9yP')?.textContent?.trim() || '';
        const image = product.querySelector('._53J4C-')?.getAttribute('src') || '';
        const price = product.querySelector('.Nx9bqj')?.textContent?.trim() || '';
        const link = product.querySelector('.rPDeLR')?.href || '';

        if (title && price) {
          scrapedProducts.push({ title, price, link, image });
        }
      });

      return scrapedProducts;
    });

    await browser.close();
    return products;
  } catch (error) {
    console.error('Scraping error:', error);
    return [];
  }
};

module.exports = scrapeProducts;
