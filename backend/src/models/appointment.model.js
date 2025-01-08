const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    userId: {

        type: String,
        required: [true, 'userId is required'],
    },
    doctorId: {
        type: String,
        required: [true, 'doctorId is required'],
    },
    doctorinfo:{
        type:String,
        required:[true, 'doctorinfo is required'],

    },
    userinfo:{
        type:String,
        required:[true, 'userinfo is required'],
    },
    date: {
        type: String,
        required: [true, 'date is required'],
    },
    status: {
        type: String,
        required: [true, 'status is required'],
        default: 'pending'
    },
    time : {
        type: String,
        required: [true, 'time is required'],
    }
},
    {
        timestamps: true
    }
);

const appointmentModel = mongoose.model('appointmentModel', appointmentSchema); // 'appointmentModel' is the name of the collection that this schema is for