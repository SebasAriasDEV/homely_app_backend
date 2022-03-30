const { Schema, model } = require('mongoose');

const roleSchema = new Schema({

    role: {
        type: String,
        required: [true, 'Name is required'],
    },


});


//Exports
module.exports = model('Role', roleSchema);