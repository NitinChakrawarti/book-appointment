const express = require('express');
const authMiddleware = require('../../middlewares/auth.middleware');
const AppointmentController = require('../../controllers/appointment.controller');

const router =  express.Router();

router.post('/book-appointment',authMiddleware, AppointmentController.bookAppointment);
router.post('/check-availabality',authMiddleware, AppointmentController.checkAvailabality);
router.post('/get-my-appointments',authMiddleware, AppointmentController.getMyAppointments);
router.post('/get-all-appointments',authMiddleware, AppointmentController.getAllAppointments);
router.post('/approve',authMiddleware, AppointmentController.approveAppointment);
router.post('/cancel',authMiddleware, AppointmentController.cancelAppointment);

exports.router = router;