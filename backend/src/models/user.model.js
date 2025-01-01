const mongoose = require('mongoose');


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
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isDoctor: {
        type: Boolean,
        default: false,
    },
    notification: {
        type: Array,
        default: []
    },
    seennotification: {
        type: Array,
        default: []
    }
},
    { timestamps: true }
);

const userModel = mongoose.model('user', user);

module.exports = userModel;