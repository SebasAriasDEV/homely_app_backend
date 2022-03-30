const { Building, User, Role} = require('../models');

const buildingNameExists = async (name = '') => {

    const existingBuilding = await Building.findOne({ name });

    if (existingBuilding){
        throw new Error(`The building with name: ${name} already exists`);
    }

    return true;
}

const userEmailExists = async (email = '') => {

    const existingUser = await User.findOne({ email, isActive:true });

    if (existingUser){
        throw new Error(`The email: ${email} already exists in the Database`);
    }

    return true;
}

const existsBuildingByID = async (uid = '') => {

    const existingBuilding = await Building.findById(uid);

    if (!existingBuilding){
        throw new Error(`The building with ID: ${uid} does NOT exists in the Database`);
    }

    return true;
}

const existsUserByID = async (uid = '') => {

    const existingUser = await User.findOne({ _id: uid, isActive: true });

    if (!existingUser){
        throw new Error(`The user with ID: ${uid} does NOT exists in the Database. It might have been deleted before.`);
    }

    return true;
}

const isValidRole = async (role = '') => {
    
    const foundRole = await Role.findOne({ role });
    
    if( !foundRole ){
        throw new Error(`The role ${role} is not a valid role in our model.`);
    }

    return true;
}


//Exports
module.exports = {
    buildingNameExists,
    userEmailExists,
    existsBuildingByID,
    existsUserByID,
    isValidRole
}