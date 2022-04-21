const { Reservation, Facility } = require("../models")

const isTimeAvailable = async ( startDate = new Date(), endDate = new Date(), building = '', facility = '' ) => {

    const existingReservations = await Reservation.find({ building, facility });

    let isAvailable = true;

    //Validate if the facility is open on those hours
    const selectedFacility = await Facility.findById( facility );
    if ( startDate.getUTCHours() < selectedFacility.startTimeUTC || endDate.getUTCHours() > selectedFacility.endTimeUTC )
    {
        return false;
    }


    //Validate if there is already a Reservation that conflicts with the request
    
    existingReservations.forEach( reservation => {
        
        //Check vs other NORMAL reservations
        if ( reservation.alwaysBlocked === false ) {
            
            console.log( startDate >= reservation.startTimeUTC , startDate < reservation.endTimeUTC );

            if ( startDate >= reservation.startTimeUTC && startDate < reservation.endTimeUTC ) isAvailable = false;//New booking starts in taken range
            if ( endDate > reservation.startTimeUTC && endDate <= reservation.endTimeUTC ) isAvailable = false;//New booking end in taken range
            if ( startDate <= reservation.startTimeUTC && endDate >= reservation.endTimeUTC ) isAvailable = false;//New booking contains the taken range
            
        } else {
            
            //Check vs ALWAYS BLOCKED spots
            if ( startDate.getUTCHours() >= reservation.startTimeUTC.getUTCHours() && startDate.getUTCHours() < reservation.endTimeUTC.getUTCHours() ) isAvailable = false;//New booking starts in ALWAYS BLOCKED range
            if ( endDate.getUTCHours() > reservation.startTimeUTC.getUTCHours() && endDate.getUTCHours() <= reservation.endTimeUTC.getUTCHours() ) isAvailable = false;//New booking end in ALWAYS BLOCKED range
            if ( startDate.getUTCHours() <= reservation.startTimeUTC.getUTCHours() && endDate.getUTCHours() >= reservation.endTimeUTC.getUTCHours() ) isAvailable = false;//New booking contains the ALWAYS BLOCKED range

        }
    });
    
    return isAvailable;
    
}

//Exports
module.exports = {
    isTimeAvailable,
}