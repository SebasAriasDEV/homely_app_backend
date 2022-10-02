const { Schema, model } = require('mongoose');

const userSchema = new Schema({

    firstName: {
        type: String,
        required: [true, 'Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    phoneNumber: {
        type: Number,
        required: false,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    role: {
        type: String,
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building',
        required: [true, 'Building ID is required'],
    },
    unit: {
        type: String,
        required: [true, 'Unit is required'],
    },
    createdAt : {
        type: Date,
        required: [true,'Please specify the date of creation for the User']
    },

    //Notifications
    fcmToken: {
        type: String,
    },
    fcmTokenDate: {
        type: Date,
    },

});

userSchema.methods.toJSON = function () {
    const { __v, password, ...user } = this.toObject();
    return user;
}

//Exports
module.exports = model('User', userSchema);