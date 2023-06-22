const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');


function delay(ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}   

async function scrapeCompanyDetails(links) {
    var len = links.length;
    const pclass = "whitespace-pre-line";
    const ptag = "p";

    const data = {
        info: [
        ]
    }


     //loop through the array of links to startup companies
     for(var i = 0; i < len; i++) {

        const page2 = await axios.get(links[i]);
        const $ = cheerio.load(page2.data);

        const title = $('title').text();
        $(`${ptag}.${pclass}`).each((index, element) => {

            const text = $(element).text();

            data.info.push({
                link: links[i],
                details: text,
            })
    
        })   
    
    }

    return data;
}
async function scrapeWebsite(url) {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        await page.goto(url); // Replace with the URL of the website
        
        //scroll to the bottom of the page, wait for 2 seconds to load
        for (var i = 0; i < 1; i++) {
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
        var cnt = 0;

        var links = [];

        $(`${tag}.${className}`).each((index, element) => {

            const src = $(element).attr('href');
            if(!map.get(src)) {
    

                map.set(src, true);
                console.log(cnt + ". https://www.ycombinator.com" + src);
                cnt++;
                links.push(`https://www.ycombinator.com${src}`);
                
        }})             

        return(scrapeCompanyDetails(links));


    } catch (err) {
        console.log("error: " + err.message);
    }   
}       
        

// scrapeWebsite("https://www.ycombinator.com/companies")

module.exports = {scrapeWebsite}