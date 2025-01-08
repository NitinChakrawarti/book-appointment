const express = require('express');
const authMiddleware = require('../../middlewares/auth.middleware');
const AppointmentController = require('../../controllers/appointment.controller');

const router =  express.Router();

router.post('/book-appointment',authMiddleware, AppointmentController.bookAppointment);

exports.router = router;