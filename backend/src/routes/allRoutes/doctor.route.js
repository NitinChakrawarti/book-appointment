const express = require('express')
const authMiddleware = require('../../middlewares/auth.middleware')
const DoctorController = require('../../controllers/doctor.controller')


const router = express.Router();

router.get('/getdoctor/:id', authMiddleware, DoctorController.getdoctor)
router.post('/updateprofile/:id', authMiddleware, DoctorController.updateDoctor)

exports.router = router