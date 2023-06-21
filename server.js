const express = require('express');
const cors =  require('cors');
const {scrapeWebsite} = require('./app.js');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.get('/scrape', async (req, res) => {
    try {
        const data = await scrapeWebsite("https://www.ycombinator.com/companies");
        console.log(data);
        res.json(data);

    } catch (err) {

        console.log("error during scraping: " + err);
        res.status(500).send("error while scraping");

    }
})
app.get('', async (req, res) => {
    res.send("hello, world!");
})

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
})
