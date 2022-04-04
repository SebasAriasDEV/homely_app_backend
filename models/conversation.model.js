const { Schema, model } = require('mongoose');

const conversationSchema = new Schema({

    participants: {
        type: Array,
        required: [true, 'Please specify the participants in the conversation']
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt : {
        type: Date,
        required: [true,'Please specify the date of creation for the Conversation']
    },

});

conversationSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
}


//Exports
module.exports = model('Conversation', conversationSchema);