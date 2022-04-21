const { Router } = require('express');
const { check } = require('express-validator');
const { makeReservation, getReservationsByDay, getReservationsByUser, deleteReservation } = require('../controllers/reservations.controller');
const { existsFacilityByID, existsReservationByID } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = new Router();


router.post('/',[
    validateJWT,
    check('facility','Facility is required and needs to be a valid mongo ID').isMongoId(),
    check('facility').custom( existsFacilityByID ),
    check('startTimeUTC','startTimeUTC is required and needs to be a valid Timestamp').notEmpty(),
    check('endTimeUTC','endTimeUTC is required and needs to be a valid Timestamp').notEmpty(),
    validateFields,
], makeReservation );


router.get('/:facility', [
    validateJWT,
    check('facility','Facility is required and needs to be a valid mongo ID').isMongoId(),
    check('facility').custom( existsFacilityByID ),
    check('dateUTC','Date in UTC is required').notEmpty(),
    validateFields,
], getReservationsByDay);


router.get('/', [
    validateJWT,
], getReservationsByUser);


router.delete('/:reservationID', [
    validateJWT,
    check('reservationID','reservationID is required and needs to be a valid mongo ID').isMongoId(),
    check('reservationID').custom( existsReservationByID ),
    validateFields,
], deleteReservation);

//Exports
module.exports = router;