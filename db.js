// mongodb-connection.js
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
// Replace the uri with your connection string
const uri = process.env.MONGO_URI; // It's better to use an environment variable for your URI

async function connectToMongoDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    console.log("Successfully connected to MongoDB.");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
    process.exit(1);
  }
}

module.exports = {connectToMongoDB};
