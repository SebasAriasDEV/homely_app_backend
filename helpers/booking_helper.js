const { Reservation } = require("../models")

const isTimeAvailable = async ( startDate = new Date(), endDate = new Date(), building = '', facility = '' ) => {

    const existingReservations = await Reservation.find({ building, facility });
    let isAvailable = true;

    existingReservations.forEach( reservation => {
        
        //Check vs other NORMAL reservations
        if ( reservation.alwaysBlocked === false ) {
            
            if ( startDate >= reservation.startTime && startDate < reservation.endTime ) isAvailable = false; //New booking starts in taken range
            if ( endDate > reservation.startTime && endDate <= reservation.endTime ) isAvailable = false; //New booking end in taken range
            if ( startDate <= reservation.startTime && endDate >= reservation.endTime ) isAvailable = false; //New booking contains the taken range
            
        } else {
            
            //Check vs ALWAYS BLOCKED spots
            if ( startDate.getUTCHours() >= reservation.startTime.getUTCHours() && startDate.getUTCHours() < reservation.endTime.getUTCHours() ) isAvailable = false; //New booking starts in ALWAYS BLOCKED range
            if ( endDate.getUTCHours() > reservation.startTime.getUTCHours() && endDate.getUTCHours() <= reservation.endTime.getUTCHours() ) isAvailable = false; //New booking end in ALWAYS BLOCKED range
            if ( startDate.getUTCHours() <= reservation.startTime.getUTCHours() && endDate.getUTCHours() >= reservation.endTime.getUTCHours() ) isAvailable = false; //New booking contains the ALWAYS BLOCKED range

        }
    });
    
    return isAvailable;
    
}

//Exports
module.exports = {
    isTimeAvailable,
}