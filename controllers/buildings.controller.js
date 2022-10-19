const { request, response } = require("express");

const Building = require('../models/building.model');


const getAllBuildings = ( req = request, res = response ) =>{
    res.json({
        response: 'OK',
    });
}

const createBuilding = async (req = request, res = response) => {

    const { name, latitude, longitude } = req.body;
    const newBuilding = new Building({ name, latitude, longitude, createdAt: new Date() });

    //Save building in DB
    await newBuilding.save();

    res.status(200).json({
        msg: 'Building has been created successfully.',
        newBuilding,
    });
}

const getBuildingInfo =  async (req = request, res = response) => {
    const { building:_id } = req.authenticatedUser;
    
    const foundBuilding = await Building.findById( _id );
    if (!foundBuilding){
        res.status(400).json({
            msg: 'The building does NOT exist in the database'
        });
    }

    return res.status(200).json({
        foundBuilding
    });
}


//Exports
module.exports = {
    getAllBuildings,
    createBuilding,
    getBuildingInfo
}