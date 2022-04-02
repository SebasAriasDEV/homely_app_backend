const { request, response } = require("express");

const Building = require('../models/building.model');


const getAllBuildings = ( req = request, res = response ) =>{

    res.json({
        response: 'OK',
    });

}

const createBuilding = async (req = request, res = response) => {

    const { name } = req.body;
    const newBuilding = new Building({ name, createdAt: new Date() });



    //Save building in DB
    await newBuilding.save();


    res.status(200).json({
        msg: 'Building has been created successfully.',
        newBuilding,
    });
}


//Exports
module.exports = {
    getAllBuildings,
    createBuilding,
}