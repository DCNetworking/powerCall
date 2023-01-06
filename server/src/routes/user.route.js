const express = require('express');
const userController = require('../controllers/user.controller');

const userRoute = express.Router();
userRoute.get('/', userController.getAllUsers);

module.exports = userRoute;