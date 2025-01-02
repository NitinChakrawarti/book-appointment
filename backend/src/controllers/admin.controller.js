const userModel = require("../models/user.model");
const doctormodel = require("../models/doctormodel");


class AdminController {

    async getAllUsers(req, res) {
        try {
            const users = await userModel.find({}).select('-password');
            res.status(200).send({
                message: "Users retrieved successfully",
                success: true,
                users
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Error retrieving users",
                success: false,
                error
            });
        }
    }

    async getDoctors(req, res) {
        try {
            const doctors = await doctormodel.find();
            if (doctors) {
                res.status(200).send({
                    message: "Doctors retrieved successfully",
                    success: true,
                    doctors
                });
            }
            else {

            }

        } catch (error) {
            console.log(error);
            res.status(500).send({
                message: "Error retrieving doctors list",
                success: false,
                error
            });
        }
    }
    async approveDoctor(req, res) {
        const { docId } = req.body
        try {
            const doctor = await doctormodel.findOne({ _id: docId });
            const user = await userModel.findOne({ _id: doctor.UserId });
            if (doctor) {
                doctor.status = "approved";
                user.isDoctor = true;
                const notification = user.notification;
                notification.push(
                    {
                        type: "Your doctor request approved",
                        message: `${user.name} your doctor request has been approved`,
                        // data: {
                        //     userId: request.body.userId,
                        //     doctorId: newDoctor._id,
                        //     name: request.body.firstName + " " + request.body.lastName,
                        //     onclick: "/admin/doctor"
                        // }
                    }
                )
                user.notification = notification;

                const updateddoc = await user.save();
                const updateduser = await doctor.save();
                res.status(200).send({
                    message: "Approved doctors resquest",
                    success: true,
                })
            }
            else {
                res.status(201).send({
                    message: "doctor not found",
                    success: false,
                })
            }
        } catch (error) {
            console.log(error);

            res.status(400).send({
                message: "error in approving",
                success: false,
                error
            })
        }
    }
}

module.exports = new AdminController();