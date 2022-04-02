const { Schema, model } = require('mongoose');

const clasificadoSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'User who created the Clasificado is required']
    },
    title: {
        type: String,
        required: [true, 'Title of Clasificado is required'],
    },
    content: {
        type: String,
        required: [true, 'Content of Clasificado is required'],
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building'
    },
    isOpen: {
        type: Boolean,
        default: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt : {
        type: Date,
        required: [true,'Please specify the date of creation for the Clasificado']
    },



});

clasificadoSchema.methods.toJSON = function () {
    const { __v, isDeleted, ...rest } = this.toObject();
    return rest;
}


//Exports
module.exports = model('Clasificado', clasificadoSchema);