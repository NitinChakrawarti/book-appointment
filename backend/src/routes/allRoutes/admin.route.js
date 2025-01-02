const express = require('express');
const authMiddleware = require('../../middlewares/auth.middleware.js');
const AdminController = require('../../controllers/admin.controller.js');

const router = express.Router();


router.get('/getallusers', authMiddleware, AdminController.getAllUsers);
router.get('/getalldoctors', authMiddleware, AdminController.getDoctors);
router.post('/doctor/approve', authMiddleware, AdminController.approveDoctor);

exports.router = router;