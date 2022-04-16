const { request, response } = require("express");
const { Facility } = require("../models");


const createFacility = async ( req = request, res = response ) => {

    const { name, building, capacity, startTime, endTime } = req.body;
    const newFacility = Facility({ name, building, capacity, startTime, endTime });

    //Check if Facility already exists in the building
    const facilityFound = await Facility.findOne({ name, building });
    if( facilityFound ) {
        return res.status(400).json({
            msg: `Service with name ${ name } already exists in the building`,
        });
    }

    const createdFacility = await newFacility.save();


    return res.status(200).json({
        msg: 'Facility has been created',
        createdFacility,
    });
}


const getFacilities = async ( req = request, res = response ) => {

    const { building } = req.authenticatedUser;

    const foundFacilities = await Facility.find({ building, isDeleted:false });
    const totalFacilities = await Facility.find({ building, isDeleted:false }).countDocuments();


    return res.status(200).json({
        totalFacilities,
        foundFacilities
    });
}

const updateFacility = async ( req = request, res = response ) => {

    const { facilityID } = req.params;
    const { building, ...payload } = req.body;

    const updatedFacility = await Facility.findByIdAndUpdate( facilityID, payload );

    return res.status(200).json({
        msg: 'Facility has been updated',
        updatedFacility,
        updatedFields: payload,
    });

}

const deleteFacility = async ( req = request, res = response ) => {

    const { facilityID } = req.params;

    const deletedFacility = await Facility.findByIdAndUpdate( facilityID, { isDeleted:true });

    return res.status(200).json({
        msg: 'Facility has been deleted',
        deletedFacility,
    });

}

//Exports
module.exports = {
    createFacility,
    getFacilities,
    updateFacility,
    deleteFacility
}