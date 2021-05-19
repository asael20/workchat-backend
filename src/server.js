const express = require('express');
const app = express();

const resources = require('./resources')

/**
 * settings for server
 */
app.use(express.json());
app.use(express.urlencoded({extended:true}));




app.use('/api', resources)

module.exports = app;