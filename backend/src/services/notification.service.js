const userModel = require('../models/user.model');

class notificationService {
    
    //------------------------get all notifications-------------------------
    async getAllNotifications(userId) {
        const user = await userModel.findOne({ _id: userId });
        const notification = user.notification;
        const seennotification = user.seennotification
        seennotification.push(...notification);
        user.seennotification = seennotification;
        user.notification = [];
        const updateduser = await user.save();
        if (updateduser) {
            return updateduser;
        }
        else {
            return null;
        }
    }
    //------------------------mark all notifications as read-------------------------
    async markAllRead(userId) {
        const user = await userModel.findOne({ _id: userId });
        if (user) {
            const notification = user.notification
            const seennotification = user.seennotification
            seennotification.push(...notification);
            user.seennotification = seennotification;
            user.notification = [];
            const updateduser = await user.save();
            return updateduser;
        }
        else {
            return null;
        }
    }
    //------------------------delete all notifications-------------------------
    async deleteAllNotification(userId) {
        const user = await userModel.findOne({ _id: userId });
        if (user) {
            user.notification = [];
            user.seennotification = [];
            const updateduser = await user.save();
            return updateduser;
        }
        else {
            return null;
        }
    }
}
module.exports = new notificationService();