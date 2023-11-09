const axios = require('axios');
const cheerio = require('cheerio');
const { ChatCompletionResponseMessageRoleEnum } = require('openai');
const puppeteer = require('puppeteer');

function delay(ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}   
async function scrapeUrl(url, ptag, pclass) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();


    // Disable Images, CSS, and Fonts from Loading
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
            req.abort();
        } else {
            req.continue();
        }
    });

    await page.goto(url);
    const htmlContent = await page.content();

    const $ = cheerio.load(htmlContent);

    const scrapedData = [{}];
    
    $(`h1.font-extralight`).each((index, element) => {
        if($(element).attr('class') === "font-extralight") {
            const text = $(element).text();
            scrapedData[0].company = text;
        }
    });

    $(`${ptag}.${pclass}`).each((index, element) => {
        if($(element).attr('class') === pclass) {
            const text = $(element).text();
            scrapedData[0].details = text;
            scrapedData[0].link = url;
        }

    });

    await browser.close();
    return scrapedData;

}
async function scrapeAllUrls(links, ptag, pclass) {

    const results = [];
    
    for(var i=0; i<links.length; i+= 5) {
        const batch = links.slice(i, i + 5);

        const batchResults = await Promise.all(batch.map(link => scrapeUrl(link, ptag, pclass)));

        results.push(...batchResults);

    }    
        
    // At this point, all the data has been pushed to `data.info`
    // Do something with the data, like saving to a file or database
    return results.flat();
}
async function scrapeWebsite(url) {
    try {
        console.log("step 1")
        const browser = await puppeteer.launch({ headless: true });
        console.log("step 2")
        const page = await browser.newPage();
        
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 }); // Replace with the URL of the website
        
        //scroll to the bottom of the page, wait for 2 seconds to load
        for (var i = 0; i < 1; i++) {
            await page.evaluate(() => {
                window.scrollTo(0, document.body.scrollHeight);
              });
    
            // Wait for some time to allow the content to load
            await delay(1000); // Adjust the timeout as needed
        }
        // Scroll to the bottom of the page
    
        const htmlContent = await page.content(); //raw content
        
        await browser.close(); //close browser

        const map = new Map(); //map to avoid duplicate companies in case

        const $ = cheerio.load(htmlContent); //jquery looking thingy

        const pageTitle = $('title').text();
        console.log('Page Title:', pageTitle);

        //parse all the <a> tags with the specific class name (company list)
        const tag = 'a';
        const className = '_company_40a66_338';
        var cnt = 0;

        var links = []; //array of

        $(`${tag}.${className}`).each((index, element) => {

            const src = $(element).attr('href');
            if(!map.get(src)) {
    

                map.set(src, true);
                console.log(cnt + ". https://www.ycombinator.com" + src);
                cnt++;
                links.push(`https://www.ycombinator.com${src}`);
                
        }})             
        const pclass = "whitespace-pre-line";
        const ptag = "p";
        const data = await scrapeAllUrls(links, ptag, pclass);
        return(data);

    } catch (err) {
        console.log("error: " + err.message);
    }   
}       
        

// scrapeWebsite("https://www.ycombinator.com/companies")

module.exports = {scrapeWebsite}


/*

web scrape from ycombinator and save to database in this schema

data = [
    companyName: "",
    companyLink: "",
    companyDescription: "",
    founders_linkedin: [],
]

openai can do the following tasks:

- go through database and generate emails from existing template, list of experiences + company info
- search for keywords and display most relevant companies to keywords. for example "ecommerce" or "banking"



*/