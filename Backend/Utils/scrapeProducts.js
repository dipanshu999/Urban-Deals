const puppeteer = require('puppeteer');

const scrapeProducts = async (category) => {
 try {
   const browser = await puppeteer.launch({
     headless: 'new',
     args: [
       '--no-sandbox',
       '--disable-setuid-sandbox', 
       '--disable-dev-shm-usage',
       '--disable-gpu'
     ]
   });

   const page = await browser.newPage();
   await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

   const targetUrl = `https://www.flipkart.com/search?q=${category}`;
   const allowedOrigins = process.env.ALLOWED_SCRAPING_ORIGINS?.split(',') || ['https://www.flipkart.com'];
   
   if (!allowedOrigins.some(origin => targetUrl.startsWith(origin))) {
     throw new Error('Domain not allowed for scraping');
   }

   await page.goto(targetUrl, {
     waitUntil: 'networkidle2',
     timeout: 60000 
   });

   await page.waitForSelector('._75nlfW', { timeout: 10000 });

   const products = await page.evaluate(() => {
     const scrapedProducts = [];
     document.querySelectorAll('._75nlfW').forEach(product => {
       const brand = product.querySelector('.syl9yP')?.textContent?.trim() || '';
       const image = product.querySelector('._53J4C-')?.getAttribute('src') || '';
       const title = product.querySelector('.WKTcLC')?.getAttribute('title') || '';
       const price = product.querySelector('.Nx9bqj')?.textContent?.trim() || '';
       const link = product.querySelector('.rPDeLR')?.href || '';

       if (title && price) {
         scrapedProducts.push({ brand, price, title, link, image });
       }
     });
     return scrapedProducts;
   });

   await browser.close();
   return products;
   
 } catch (error) {
   console.error('Scraping error:', error);
   throw error; // Propagate error to API handler
 }
};

module.exports = scrapeProducts;