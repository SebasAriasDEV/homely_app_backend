const { request, response } = require("express");
const { getDistanceFromLatLonInKm } = require("../helpers/distance_calculator");
const { Place, Building } = require("../models");


const createPlace = async ( req = request, res = response ) => {

    const { name, openHours, address, phoneNumber, description, rating, latitude, longitude } = req.body;

    const newPlace = await Place({ name, openHours, address, phoneNumber, description, rating, latitude, longitude });

    await newPlace.save();

    return res.status(200).json({
        msg: 'Directory has been created',
        newPlace,
    });
}

const getPlaces = async ( req = request, res = response ) => {

    const { maxDistance = -1 } = req.body;
    const { building } = req.authenticatedUser;


    //Get current authenticated user location
    const { latitude, longitude } = await Building.findById( building );

    //Find all the places in the DB
    const foundPlaces = await Place.find({ isDeleted:false }).sort( 'name' );

    let returnPlaces = [];

    foundPlaces.forEach( place => {
        place.distanceTemp = getDistanceFromLatLonInKm( latitude, longitude, place.latitude, place.longitude );
        if ( maxDistance === -1) {
            returnPlaces.push( place );
        } else {
            if( place.distanceTemp <= maxDistance ){
                returnPlaces.push( place );
            }
        }
    });

    return res.status(200).json({
        msg: 'Places listed below',
        totalPlaces: returnPlaces.length,
        returnPlaces,
    });

}

const updatePlace = async ( req = request, res = response ) => {

    const { placeID } = req.params;
    const { _id, isDeleted, ...payload } = req.body;

    const updatedPlace = await Place.findByIdAndUpdate( placeID, payload );

    return res.status(200).json({
        msg: 'The place has been updated correctly',
        updatedPlace,
    });

}

const deletePlace = async ( req = request, res = response ) => {

    const { placeID } = req.params;

    const deletedPlace = await Place.findByIdAndUpdate( placeID, { isDeleted:true });

    return res.status(200).json({
        msg: 'Place has been deleted',
        deletedPlace,
    });
}
//Exports
module.exports = {
    createPlace,
    getPlaces,
    updatePlace,
    deletePlace
}