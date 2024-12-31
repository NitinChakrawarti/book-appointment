const userModel = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const salt = bcryptjs.genSaltSync(10);

class userService {
    //-------create user function -----//
    async createuser(name, email, password) {
        const hashedPassword = bcryptjs.hashSync(password, salt);
        const newUser = await new userModel({
            // name, email, password
            name, email, password: hashedPassword
        }).save();
        return newUser;
    }

    async login(email, password) {
        const user = await userModel.findOne({ email });
        if (user && bcryptjs.compareSync(password, user.password)) {
            return user;
        }
        else {
            return null;
        }
    }

    //-------------user token generation ---------//

    async userToken(user) {
        const secret = process.env.JWT_PRIVATE_KEY
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            name: user.name
        }, secret);
        return token
    }

    //---------------user token verification--------//

    async tokenverify(token) {
        try {
            const secret = process.env.JWT_PRIVATE_KEY;
            const info = jwt.verify(token, secret); // Synchronous verification
            return info;
        } catch (err) {
            throw new Error("Token verification failed");
        }
    }
}

module.exports= new userService();