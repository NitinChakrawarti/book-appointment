const mongoose = require('mongoose');


const doctor = mongoose.Schema({
    UserId: {
        type: String
    },
    firstName: {
        type: String,
        required: [true, 'firstName is required'],
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required'],
    },
    phone: {
        type: String,
        required: [true, 'phone is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
    },
    website: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'address is required'],
    },
    specialization: {
        type: String,
        required: [true, ' Enter Specialization']
    },
    experience: {
        type: String,
        required: [true, ' Enter Experience']
    },
    fees: {
        type: Number,
        required: [true, ' Enter Fees']
    },
    status: {
        type: String,
        default: 'pending'
    },
    timings: {
        type: Object,
        required: [true, ' Enter Timings']
    },
},
    {
        timestamps: true
    }
)


const doctormodel = mongoose.model('doctormodel', doctor);
module.exports = doctormodel;