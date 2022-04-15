const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({

    type: {
        type: String,
        required: [true, 'Title is required'],
        enum: ['Message','News'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    read: {
        type: Boolean,
        default: false,
    }

});

notificationSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
}


//Exports
module.exports = model('Notification', notificationSchema);