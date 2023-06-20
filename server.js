const express = require('express');
const {scrapeWebsite} = require('./app.js');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.get('/scrape', async (req, res) => {
    try {
        const data = await scrapeWebsite("https://www.ycombinator.com/companies");
        console.log(data);
        res.send(data);

    } catch (err) {

        console.log("error during scraping: " + err);
        res.status(500).send("error while scrping");

    }
})
app.get('', async (req, res) => {
    res.send("hello, world!");
})

app.post('/scraped-data', async (req, res) => {
    const data = await req.body;
    console.log("received data from app:", data);
    res.send("received");
})
app.get('/scraped-data', async (req, res) => {
    res.send("received");
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})
