const express = require('express');
const UserController = require('../../controllers/user.controller.js');
const authMiddleware = require('../../middlewares/auth.middleware.js');

//-----------------router----------------//
const router = express.Router();

//---------------user route----------------//
router.post('/sign-up', UserController.signUp);
router.post('/login', UserController.login);
router.post('/getuser', authMiddleware, UserController.authController);
exports.router = router;



