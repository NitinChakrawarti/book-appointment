const userModel = require('../models/user.model');
const notificationService = require('../services/notification.service');

class NotificationController {

    async getAllNotifications(request, response) {
        const userId = request.body.userId;
        try {
            const updateduser = await notificationService.getAllNotifications(userId);
            if (updateduser) {
                return response.status(200).send({
                    message: "Notifications",
                    success: true,
                    data: updateduser
                });
            }
            else {
                return response.status(201).send({
                    message: "No notifications found",
                    success: false
                });
            }
        }
        catch (error) {
            return response.status(500).send({
                message: "Error in getting notifications",
                success: false,
                error
            });
        }
    }

    //------------------------------mark all notifications as read-------------------------

    async markAllRead(request, response) {
        try {
            const result = await notificationService.markAllRead(request.body.userId);
            if (result) {
                return response.status(200).send({
                    message: "Notifications marked as read",
                    success: true,
                    data: result
                });
            }
            else {
                return response.status(201).send({
                    message: "No notifications found",
                    success: false
                });
            }
        } catch (error) {
            return response.status(500).send({
                message: "Error in marking notifications as read",
                success: false,
                error
            });
        }
    }
}

module.exports = new NotificationController();