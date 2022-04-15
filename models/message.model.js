const { Schema, model } = require('mongoose');

const messageSchema = new Schema({

    pqr: {
        type: Schema.Types.ObjectId,
        ref: 'Pqr'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building'
    },
    content: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt : {
        type: Date,
        required: [true,'Please specify the date of creation for the Message']
    },

});

messageSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
}


//Exports
module.exports = model('Message', messageSchema);