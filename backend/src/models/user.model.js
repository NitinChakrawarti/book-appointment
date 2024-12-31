const mongoose = require('mongoose');
const colors = require('colors');

const user = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        trim: true,
        max: 32,
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'password is required'],
    },
},
    { timestamps: true }
);

const userModel = mongoose.model('user', user);

module.exports = userModel;