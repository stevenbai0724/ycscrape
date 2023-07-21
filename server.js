const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {scrapeWebsite} = require('./app.js');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser')

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;

app.get('/scrape', async (req, res) => {
    console.log(process.env.OPENAI_API_KEY)
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);
    if (!configuration.apiKey) {
        console.log("wrong api key ");
        res.status(500).json({
            error: {
            message: "OpenAI API key not configured, please follow instructions in README.md",
            }
        });
        return;
    }
    try {
        //const data = await scrapeWebsite("https://www.ycombinator.com/companies");
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Tell me a funny dad joke",
            temperature: 0.6,
            max_tokens: 200,
        });
        const response = completion.data.choices[0].text;


        console.log(response);
        res.json(response);

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
