const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        mongoose.connect(process.env.MONGO_CONN);
        console.log('Connected to Homely DB');

    } catch (error) {
        console.log(error.toString());
        throw new Error(error);
    }

}


//Exports
module.exports = {
    dbConnection,
}