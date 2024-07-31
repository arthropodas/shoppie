console.log("hello world");
const bodyParser = require('body-parser');  
const express = require('express');
const dotenv = require('dotenv').config();
const connectDb = require("./src/database")
const errorHandler = require("./src/middleware/errorHandler");
const cors= require("cors")
connectDb()
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// Routes setup
app.use("/", require("./src/router")); // Example route setup, adjust as per your application

// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log("Server is listening on port", port);
});

module.exports = app;