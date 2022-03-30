const { Schema, model } = require('mongoose');

const articleSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true,'User who created the article is required']
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
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