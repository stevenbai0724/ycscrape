const axios = require('axios');
const cheerio = require('cheerio');

function openImage(url) {
    const newWindow = window.open();
    newWindow.document.write(`<html><body><img src="${url}" /></body></html>`);
    newWindow.document.close();
  }

async function scrapeWebsite(url) {
    try {
        const res = await axios.get(url);


        const $ = cheerio.load(res.data);



        const pageTitle = $('title').text();
        console.log('Page Title:', pageTitle);

        const tag = 'img';
        const className = 'user-gravatar';

        $(`${tag}.${className}`).each((index, element) => {
            const src = $(element).attr('src');
            openImage(src);
        })


    } catch (err) {
        console.log("error: " + err.message);

    }   
}       
        

scrapeWebsite("https://dmoj.ca/user/stevenbai0724")