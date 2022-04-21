
const { Schema, model } = require('mongoose');

const reservationSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [ true, 'User is required']
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building',
        required: [ true, 'Building is required']
    },
    facility: {
        type: Schema.Types.ObjectId,
        ref: 'Facility',
        required: [ true, 'Facility is required']
    },
    startTimeUTC: {
        type: Date,
        required: [ true, 'Start time is required']
    },
    endTimeUTC: {
        type: Date,
        required: [ true, 'End time is required']
    },

    alwaysBlocked : {
        type: Boolean,
        default: false,
    }

});

reservationSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
}


//Exports
module.exports = model('Reservation', reservationSchema);