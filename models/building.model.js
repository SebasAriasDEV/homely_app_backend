const { Schema, model } = require('mongoose');

const buildingSchema = new Schema({

    name: {
        type: String,
        required: [ true,'Name is required'],
        unique: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },


    //Services inlcuded in each building
    hasNews:{
        type: Boolean,
        default: true,
    },
    hasClasif:{
        type: Boolean,
        default: true,
    },
    hasBooking:{
        type: Boolean,
        default: true,
    },
    hasPQRS:{
        type: Boolean,
        default: true,
    },
    hasCitofonia:{
        type: Boolean,
        default: true,
    },
    
    
});

buildingSchema.methods.toJSON = function () {
    const { __v, ...building } = this.toObject();
    return building;
}

//Exports
module.exports = model('Building', buildingSchema);