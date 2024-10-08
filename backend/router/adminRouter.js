const express = require('express');
const adminRouter = express.Router();
const adminController = require('../controller/adminController');

adminRouter.route('/auth/:link')
.get(adminController.verifyLink);

adminRouter.route('/set')
.get(adminController.setAdmin);


module.exports = adminRouter;