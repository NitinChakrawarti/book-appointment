const appointmentModel = require("../models/appointment.model");
const moment = require("moment");
const userModel = require("../models/user.model");
const doctormodel = require("../models/doctormodel");

class AppointmentController {

    async bookAppointment(req, res) {
        req.body.status = "pending";
        req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
        req.body.time = moment(req.body.time, "HH:mm").toISOString();
        try {
            const doctordoc = req.body.doctorinfo;
            const userdoc = req.body.userinfo;
            const newAppointment = new appointmentModel(req.body);
            await newAppointment.save();
            const doctorinfo = await userModel.findById({ _id: doctordoc.UserId });
            await doctorinfo.notification.push({
                type: "New-Appointment-request",
                message: `You have a new appointment request from ${userdoc.name}`,
                onclickpath: `/doctor/appointments`
            });
            await doctorinfo.save();
            return res.status(200).json({
                message: "Appointment booked successfully",
                success: true,
                data: newAppointment
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", sucess: false, error });
        }
    }

    async checkAvailabality(req, res) {
        try {
            const { doctorId, date } = req.body;
            const fromtime = moment(req.body.time, "HH:mm").subtract('1', 'hours').toISOString();
            const totime = moment(req.body.time, "HH:mm").add('1', 'hours').toISOString();

            const isAvailable = await appointmentModel.findOne({
                doctorId,
                date,
                time: {
                    $gte: fromtime,
                    $lte: totime
                }
            });
            if (isAvailable) {
                return res.status(200).json({ message: "Slot not available", success: true });
            } else {
                return res.status(200).json({ message: "Slot available", success: true, docavailable: true });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", success: false, error });
        }
    }

    async getMyAppointments(req, res) {
        try {
            const userId = req.body.userId;
            const appointments = await appointmentModel.find({ userId });
            if (appointments) {
                return res.status(200).json({ message: "Appointments fetched successfully", success: true, data: appointments });
            } else {
                return res.status(200).json({ message: "No appointments found", success: true });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", success: false, error });
        }
    }

    async getAllAppointments(req, res) {
        const { userId } = req.body;
        try {
            const doctor = await doctormodel.findOne({ UserId: userId });
            const appointments = await appointmentModel.find({ doctorId: doctor._id });
            if (appointments) {
                return res.status(200).json({ message: "Appointments fetched successfully", success: true, data: appointments });
            } else {
                return res.status(200).json({ message: "No appointments found", success: true });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", success: false, error });
        }
    }

    async approveAppointment(req, res) {
        try {
            const { _id } = req.body;
            const appointment = await appointmentModel
                .findByIdAndUpdate(_id, { status: "confirmed" }, { new: true });
            const user = await userModel.findById(appointment.userId);
            await user.notification.push({
                type: "Appointment-confirmed",
                message: `Your appointment has been confirmed by the doctor`,
                onclickpath: `/user/appointments`
            });
            await user.save();
            if (appointment) {
                return res.status(200).json({ message: "Appointment approved successfully", success: true });
            } else {
                return res.status(200).json({ message: "Failed to approve appointment", success: false });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", success: false, error });
        }
    }

    async cancelAppointment(req, res) {
        try {
            const { _id } = req.body;
            const appointment = await appointmentModel
                .findByIdAndUpdate(_id, { status: "Rejected" }, { new: true });
            const user = await userModel.findById(appointment.userId);
            await user.notification.push({
                type: "Appointment-Rejected",
                message: `Your appointment has been Rejected by the doctor`,
                onclickpath: `/user/appointments`
            });
            await user.save();
            if (appointment) {
                return res.status(200).json({ message: "Appointment Rejected successfully", success: true });
            }
            else {
                return res.status(200).json({ message: "Failed to reject appointment", success: false });
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error", success: false, error });
        }
    }
}

module.exports = new AppointmentController();