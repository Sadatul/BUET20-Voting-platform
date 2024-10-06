const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/adminController');

adminRouter.route('/auth/:link')
.get(adminController.verifyLink);


module.exports = adminRouter;