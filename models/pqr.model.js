const { Schema, model } = require('mongoose');

const pqrSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'User who created the PQR is required']
    },
    content: {
        type: String,
        required: [true, 'Content of PQR is required'],
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building'
    },
    isDone: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt : {
        type: Date,
        required: [true,'Please specify the date of creation for the PQR']
    },
    completedAt : {
        type: Date,
    },


});

pqrSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
}


//Exports
module.exports = model('Pqr', pqrSchema);