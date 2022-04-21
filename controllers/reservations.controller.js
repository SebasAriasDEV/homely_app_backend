const { request, response } = require("express");
const { isTimeAvailable } = require("../helpers/booking_helper");
const { Reservation } = require("../models");


const makeReservation = async ( req = request , res = response ) => {

    const { startTime, endTime, facility, alwaysBlocked = false } = req.body;
    const { _id:userID, building } = req.authenticatedUser;

    const startDate = new Date( startTime );
    const endDate = new Date( endTime );

    //Validate is timeslot is available
    const isAvailable = await isTimeAvailable( startDate, endDate, building, facility );
    if( !isAvailable ) {
        return res.status(400).json({
            msg: 'The time you are trying to book is not available.'
        });
    }

    const newReservation = Reservation({ 
        user: userID,
        building,
        facility,
        startTime: startDate,
        endTime: endDate,
        alwaysBlocked,
    });

    const createdReservation = await newReservation.save();

    return res.status(200).json({
        msg: 'Reservation created',
       createdReservation,
    });
}

const getReservationsByDay = async ( req = request , res = response ) => {

    const { _id:userID, building } = req.authenticatedUser;

    const { facility } = req.params;
    const { dateUTC } = req.query;

    const foundReservations = await Reservation.find({ building, facility });
    const formatDateUTC = new Date( dateUTC );

    let returnReservations = [];

    //Get only the reservations from the same day
    foundReservations.forEach( reservation => {
        if ( (formatDateUTC.getUTCDay() === reservation.startTime.getUTCDay() && formatDateUTC.getUTCMonth() === reservation.startTime.getUTCMonth() && formatDateUTC.getUTCFullYear() === reservation.startTime.getUTCFullYear() ) 
            || (formatDateUTC.getUTCDay() === reservation.endTime.getUTCDay() && formatDateUTC.getUTCMonth() === reservation.endTime.getUTCMonth() && formatDateUTC.getUTCFullYear() === reservation.endTime.getUTCFullYear() )
            ) {
                returnReservations.push( reservation );
        }
    });

    return res.status(200).json({
        returnReservations,
    });
}

const getReservationsByUser = async ( req = request , res = response ) => {

    const { _id:user, building } = req.authenticatedUser;

    const foundReservations = await Reservation.find({ building, user });

    return res.status(200).json({
        foundReservations,
    });
}

const deleteReservation = async ( req = request, res = response ) => {

    const { reservationID } = req.params;

    const deletedReservation = await Reservation.findByIdAndDelete( reservationID );

    return res.status(200).json({
        msg: 'Reservation deleted',
        deletedReservation,
    });
}

//Exports
module.exports = {
    makeReservation,
    getReservationsByDay,
    getReservationsByUser,
    deleteReservation
}