const express = require('express');
const UserController = require('../../controllers/user.controller.js');
const authMiddleware = require('../../middlewares/auth.middleware.js');
const userController = require('../../controllers/user.controller.js');

//-----------------router----------------//
const router = express.Router();

//---------------user route----------------//
router.post('/sign-up', UserController.signUp);
router.post('/login', UserController.login);
router.post('/getuser', authMiddleware, UserController.authController);
router.post('/applydoctor',authMiddleware, UserController.applyDoctor);
router.get('/docstatus', authMiddleware, userController.getdocstatus);
router.get('/get-all-doctors', authMiddleware, userController.getAlldoctors)
router.get('/getadoctor/:doctorId', authMiddleware, UserController.getAdoctor);
exports.router = router;