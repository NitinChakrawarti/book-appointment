const express = require('express');
const colors = require('colors');
const morgon = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

//---------config --------------//
dotenv.config({ path: '.env' });

//---------rest object -----------//
const app = express();

//-----------middlewares----------//

app.use(express.json());

app.use(morgon('dev'));

app.use(cors({
    // origin: "*",
    origin: process.env.FRONT_URL_,
    credentials: true
}));

app.use(cookieParser({
    withCredentials: true
}));

//--------routes ---------------//
// app.use('/', require('./routes/mainRoute'));
app.use('/api/v1/user', require('./routes/mainRoute')); 

module.exports = { app };
