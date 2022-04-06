const {
    Schema,
    model
} = require('mongoose');

const articleSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User who created the article is required']
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
    isDeleted: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        required: [true, 'Please specify the date of creation for the Article']
    },
    img: {
        type: String,
    }

});

articleSchema.methods.toJSON = function () {
    const {
        __v,
        ...rest
    } = this.toObject();
    return rest;
}


//Exports
module.exports = model('Article', articleSchema);