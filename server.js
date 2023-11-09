const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {scrapeWebsite} = require('./app.js');
const { Configuration, OpenAIApi } = require('openai');
const bodyParser = require('body-parser')
const axios = require("axios");
const { connectToMongoDB } = require('./db');
const Company = require('./models/Company.js');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 5000;
// const configuration = new Configuration({
//         apiKey: process.env.OPENAI_API_KEY,
// });





// const companySchema = new mongoose.Schema({
//     company: String,
//     link: String,
//     details: String,
// });

// const openai = new OpenAIApi(configuration);
// if (!configuration.apiKey) {
//     console.log("wrong api key ");
//     res.status(500).json({
//         error: {
//         message: "OpenAI API key not configured, please follow instructions in README.md",
//         }
//     });
//     return;
// }
const endpoint = 'https://api.openai.com/v1/chat/completions';
const headers = {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
}
const data = {
    messages: [
        {"role": "user", "content": "where are the golden state warriors located"},
        {"role": "assistant", "content":"The Golden State Warriors are located in San Francisco, California. Their home games are played at the Chase Center, a state-of-the-art sports and entertainment arena situated in the Mission Bay neighborhood of San Francisco."},
        {"role": "user", "content": "name 3 players on the team"},

    ],
    temperature: 0.7,
    max_tokens: 60,
    model: "gpt-3.5-turbo"
  };
app.post('/send', async (req, res) => {
    try {
        console.log("sending")
        // Create a new company instance using the model
        const { company, details, link } = req.body;

        console.log(company, details, link);

        const newCompany = new Company({
            company: company,
            details: details,
            link: link
        });
      
        const saved = await newCompany.save();
        res.json(saved);

    } catch (err) {
        console.error(err); // Log the entire error
        res.status(400).json({ error: err.message }); 
    }
})
app.get('/scrape', async (req, res) => {
    
    try {
        //const data = await scrapeWebsite("https://www.ycombinator.com/companies");
dw
        const data = [];

        // const response = await axios.post(endpoint, data, { headers: headers });
        // const completion = response.data.choices[0]

        // res.json(completion)
        console.log(data);
        res.json(data);

    } catch (err) {

        console.log("error during scraping: " + err);
        res.status(500).send("error while scraping");

    }
})
app.post('/scrape', async (req, res) => {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
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
        const data = await scrapeWebsite("https://www.ycombinator.com/companies");
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Tell me a funny dad joke",
            temperature: 0.6,
            max_tokens: 200,
        });
        const response = completion.data.choices[0].text;

        console.log(response);

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



connectToMongoDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
    mongoose.connection.on('connected', () => console.log('Mongoose connected to DB.'));
  }).catch(error => {
    console.error('Database connection failed', error);
    process.exit(1);
  });
  mongoose.connection.on('connected', () => console.log('Mongoose connected to DB.'));
  
  
  