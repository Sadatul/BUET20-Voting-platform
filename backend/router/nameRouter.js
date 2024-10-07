const express = require('express');
const nameController = require('../controller/nameController');

const nameRouter = express.Router();


nameRouter.route('/')
.get(nameController.getAllNames);

module.exports = nameRouter