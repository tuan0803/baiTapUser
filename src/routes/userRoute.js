const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/users', userController.getUsers);

router.get('/users/:msv', userController.getUserID);

router.post('/users', userController.checkUserExists, userController.createUser);

router.delete('/users/:msv', userController.checkUserExists, userController.deleteUser);


module.exports = router;
