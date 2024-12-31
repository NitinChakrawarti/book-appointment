const userModel = require("../models/user.model.js");
const userService = require("../services/user.service.js");


class UserController {
    //-----sign up function ------//
    async signUp(request, response, next) {
        const { name, email, password } = request.body;
        try {
            const newUser = await userService.createuser(name, email, password);
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
                return response.status(200).send({
                    message: "User found",
                    sucess: true,
                    name: user.name,
                    email: user.email,
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
}

module.exports = new UserController();