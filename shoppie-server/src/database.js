
const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDb = async () => {
    const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const clusterUrl = process.env.MONGODB_CLUSTER_URL; // Example: 'cluster0.iyiykhm.mongodb.net'
console.log(">>>>>>>>>>",username, clusterUrl)
const uri = `mongodb+srv://${username}:${password}@${clusterUrl}/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB', err);
    process.exit(1);
  }
};

module.exports = connectDb;
