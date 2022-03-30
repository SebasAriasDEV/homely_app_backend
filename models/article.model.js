const { Schema, model } = require('mongoose');

const articleSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        unique: true,
    },
    building: {
        type: Schema.Types.ObjectId,
        ref: 'Building'
    },
    isActive: {
        type: Boolean,
        default: true,
    }

});

articleSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
}


//Exports
module.exports = model('Article', articleSchema);