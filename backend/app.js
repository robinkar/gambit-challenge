const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const dataRouter = require('./routes/data');

app.use(cors());

app.use('/api/data', dataRouter);

app.use(express.static(path.join(__dirname, '..', 'build')));

app.use(express.static('public'));

module.exports = app;
