const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');


function delay(ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}
async function scrapeWebsite(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        await page.goto(url); // Replace with the URL of the website
        

        for (var i = 0; i < 20; i++) {
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
              });
            
              // Wait for some time to allow the content to load
              await delay(2000); // Adjust the timeout as needed
        }
        // Scroll to the bottom of the page

        const htmlContent = await page.content();

        await browser.close();

        const map = new Map();

        const $ = cheerio.load(htmlContent);

        const pageTitle = $('title').text();
        console.log('Page Title:', pageTitle);

        const tag = 'a';
        const className = 'WxyYeI15LZ5U_DOM0z8F';

        $(`${tag}.${className}`).each((index, element) => {
            const src = $(element).attr('href');
            if(!map.get(src)) {
                
                map.set(src, true);
                console.log("https://www.ycombinator.com/companies" + src)
            }

        })


    } catch (err) {
        console.log("error: " + err.message);

    }   
}       
        

scrapeWebsite("https://www.ycombinator.com/companies")