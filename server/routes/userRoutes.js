
const express = require('express');
const { userController } = require('../controllers/UserController');

const userRoutes = express.Router();


userRoutes.post('/register', userController.register)
userRoutes.post('/login', userController.login)
userRoutes.get('/getAll', userController.getAll)





module.exports = {
    userRoutes
}
