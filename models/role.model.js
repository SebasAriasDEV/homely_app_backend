const { Schema, model } = require('mongoose');

const roleSchema = new Schema({

    role: {
        type: String,
        required: [true, 'Name is required'],
    },

});

roleSchema.methods.toJSON = function () {
    const { __v, ...rest } = this.toObject();
    return rest;
}


//Exports
module.exports = model('Role', roleSchema);