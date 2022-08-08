const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');

// Load env variables
dotenv.config({ path: './config/config.env'});

const app = express();

// Connect to db
connectDB();

app.use(express.json({}));
app.use(cors());

app.get("/", (req, res) => {
	res.send("API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);