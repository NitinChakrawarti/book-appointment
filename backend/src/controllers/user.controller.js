const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");
const doctormodel = require("../models/doctormodel.js");

class UserController {
    //-----sign up function ------//
    async signUp(request, response, next) {
        const { name, email, password } = request.body;
        try {
            await userService.createuser(name, email, password);
            return response.status(200).send({ message: "You can login now" });
        }
        catch (error) {
            next(error);
        }
    }
    async login(request, response, next) {
        const { email, password } = request.body;
        try {
            const user = await userService.login(email, password);
            if (user) {
                const loginToken = await userService.userToken(user);
                const usertoken = loginToken;
                user.password = undefined;
                user._id = undefined
                return response.cookie('logintoken', usertoken, {}).json('ok');
            } else {
                return response.status(404).send({
                    message: "Invalid credentials",
                });
            }
        } catch (error) {
            next(error); // Passes the error to an error-handling middleware
        }
    }
    async authController(request, response) {

        try {
            const user = await userModel.findOne({ _id: request.body.userId });
            if (!user) {
                return response.status(202).send({
                    message: "User not found",
                    sucess: false
                });
            } else {
                user.password = undefined;
                return response.status(200).send({
                    message: "User found",
                    sucess: true,
                    user: user
                });
            }
        } catch (error) {
            return response.status(500).send({
                message: "Internal server error",
                sucess: false,
                error
            });
        }
    }
    async applyDoctor(request, response, next) {
        try {
            const newDoctor = await doctormodel({ ...request.body, UserId: request.body.userId, status: "pending" });
            await newDoctor.save();
            const adminuser = await userModel.findOne({ isAdmin: true });
            const notification = adminuser.notification;
            notification.push({
                type: "apply-doctor-request",
                message: `${request.body.firstName} has applied for doctor`,
                data: {
                    userId: request.body.userId,
                    doctorId: newDoctor._id,
                    name: request.body.firstName + " " + request.body.lastName,
                    onclick: "/admin/doctor"
                }
            });
            await userModel.findOneAndUpdate(adminuser._id, { notification: notification });
            return response.status(201).send({ message: "Doctor added successfully" });
        } catch (error) {
            next(error);
        }
    }
    async getdocstatus(request, response, next) {
        const { userId } = request.body;
        try {
            const dcotor = await doctormodel.findOne({ UserId: userId });
            if (dcotor) {
                return response.status(200).send(
                    {
                        message: "you have alreay a application",
                        sucess: true,
                        data: dcotor
                    }
                )
            }
            else {
                return response.status(200).send(
                    {
                        message: "no application found for this user ",
                        sucess: false,
                    }
                )
            }
        }
        catch (error) {
            console.log(error)
            return response.send(400).send({
                message: "error in fetching application",
                sucess: false,
                error
            })
        }
    }
    async getAlldoctors(request, response) {
        try {
            const doctors = await doctormodel.find({});
            if (doctors) {
                return response.status(200).send({
                    message: "doctors list fetched",
                    success: true,
                    doctors
                })
            }
            else {
                return response.status(200).send({
                    message: "no doctor available ",
                    success: true,
                })
            }
        } catch (error) {
            console.log(erro);
            return response.status(400).send({
                message: "error in fetching doctors"
            })

        }
    }
    async getAdoctor(request, response) {
        const { doctorId } = request.params
        try {
            const doctor = await doctormodel.findOne({ _id: doctorId })
            if (doctor) {
                return response.status(200).send({
                    message: "doctor found",
                    success: true,
                    doctor
                })
            }
            else {
                return response.status(200).send({
                    message: "no doctor found",
                    success: true
                })
            }
        } catch (error) {
            console.log(error);
            return response.status(400).send({
                message: "error in getting details",
                sucess: false,
                error
            })
        }
    }
}
module.exports = new UserController();