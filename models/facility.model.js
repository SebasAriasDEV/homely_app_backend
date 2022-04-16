
const { Schema, model } = require('mongoose');

const facilitySchema = new Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building',
        required: [true,'Building hours is required'],
    },
    img: {
        type: String,
    },
    capacity: {
        type: Number,
        required: [true,'Capacity number is required'],
    },
    startTime: {
        type: Number,
        required: [true,'Start Time is required'],
    },
    endTime: {
        type: Number,
        required: [true,'Start Time is required'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },


    closedHours: {
        type: [ Number ],
    }
});



facilitySchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
}

//Export
module.exports = model('Facility', facilitySchema);