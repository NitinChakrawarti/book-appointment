const express = require('express');
const authMiddleware = require('../../middlewares/auth.middleware.js');
const NotificationController = require('../../controllers/notification.controller.js');

const router = express.Router();

router.post('/get-all-notifications', authMiddleware, NotificationController.getAllNotifications);
router.post('/mark-all-read', authMiddleware, NotificationController.markAllRead);
router.post('/delete-all-notification', authMiddleware, NotificationController.deleteAllNotification);

exports.router = router;

