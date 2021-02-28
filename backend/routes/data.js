const express = require('express');

const dataRouter = express.Router();

const dataService = require('../services/dataService');

dataRouter.get('/', (req, res) => {
  const data = dataService.getAll();
  res.json(data);
});

module.exports = dataRouter;
