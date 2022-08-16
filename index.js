const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const colors = require('colors');

colors.enable();

// Load env variables
dotenv.config({ path: './config/config.env' });

const app = express();

// Connect to db
connectDB();

app.use(express.json({}));

app.use(cors());

app.use('/guest', require('./src/routes/guests'));
app.use('/user', require('./src/routes/users'));
app.use('/auth', require('./src/routes/auth'));
app.use('/room', require('./src/routes/rooms'));
app.use('/booking', require('./src/routes/search'));
app.use('/booking', require('./src/routes/bookings'));


const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);