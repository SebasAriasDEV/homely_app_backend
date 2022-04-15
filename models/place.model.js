
const { Schema, model } = require('mongoose');

const placeSchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    openHours: {
        type: String,
        required: [true,'Open hours is required'],
    },
    address: {
        type: String,
        required: [true,'Address is required'],
    },
    phoneNumber: {
        type: String,
        required: [true,'Phone number is required'],
    },
    description: {
        type: String,
        required: [true,'Phone number is required'],
    },
    rating: {
        type: Number
    },
    latitude: {
        type: Number
    },
    longitude: {
        type: Number
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },

    //Only used for temporary calculations
    distanceTemp: {
        type: Number
    }
});

placeSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
}

//Export
module.exports = model('Place', placeSchema);