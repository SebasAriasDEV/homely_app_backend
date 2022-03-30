const { request, response } = require("express");
const bcrypt = require('bcryptjs');

const { User } = require('../models');


// ******************* Create ***************************************************
const createUser = async (req = request, res = response) => {
    
    const { firstName, lastName, role, building, unit , email, password } = req.body;
    const newUser = new User({ firstName, lastName, role, building, unit ,email, password });
    
    //Encrypt password
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    //Save user in DB
    await newUser.save();

    console.log(newUser);
    
    res.status(200).json({
        message: 'User has been created successfully.',
        newUser,
    });
}

// ******************* Read *****************************************************
const getAllUsers = async ( req = request, res = response ) => {
    
    const foundUsers = await User.find({ isActive: true });
    const totalUsersFound = await User.find({ isActive: true }).countDocuments();
    
    
    res.json({
        response: 'OK',
        totalUsersFound,
        foundUsers,
    });
    
}

const getUsersByBuildingID = async ( req = request, res = response ) => {
    
    const { buildingID } = req.params;
    
    const foundUsers = await User.find({ isActive: true, building: buildingID });
    const totalUsersFound = await User.find({ isActive: true, building: buildingID }).countDocuments();
    
    
    res.json({
        response: 'OK',
        totalUsersFound,
        foundUsers,
    });
    
}

// ******************* Update *****************************************************
const updateUserInfo = async ( req = request, res = response ) => {

    const { role, building, unit , email, password, ...rest} = req.body;
    const { uid } = req.params;

    if(password){
        const salt = bcrypt.genSaltSync();
        rest.password = bcrypt.hashSync(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate( uid, rest );
    
    res.status(200).json({
        message: 'User has been updated successfully.',
        updatedUser,
    });
}

// ******************* Delete *****************************************************
const deleteUser = async ( req = request, res = response ) => {

    const { uid } = req.params;
    const deletedUser = await User.findByIdAndUpdate( uid, { isActive: false });

    res.status(200).json({
        message: 'User has been deleted successfully.',
        deletedUser,
    });


}








//Exports
module.exports = {
    getAllUsers,
    createUser,
    getUsersByBuildingID,
    updateUserInfo,
    deleteUser
}