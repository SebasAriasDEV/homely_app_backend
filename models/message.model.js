const { Schema, model } = require('mongoose');

const messageSchema = new Schema({

    conversation: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
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