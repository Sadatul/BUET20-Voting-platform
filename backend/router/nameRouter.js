const express = require('express');
const nameController = require('../controller/nameController');
const {authenticate} = require('../controller/adminController');
const nameRouter = express.Router();


nameRouter.route('/')
.get(authenticate,nameController.getAllNames);

nameRouter.route('/vote')
.post(authenticate,nameController.castVote);



module.exports = nameRouter