const { Router } = require('express');
const { check } = require('express-validator');

const { createPlace, getPlaces, updatePlace, deletePlace } = require('../controllers/places.controller');
const { existsPlaceByID } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');

const { validateJWT } = require('../middlewares/validate_jwt');
const { validateRolesPermissions } = require('../middlewares/validate_roles_permissions');

const router = new Router();

router.post('/',[
    validateJWT,
    validateRolesPermissions(['SUPER_ADMIN_ROLE']),
    check('name','Field name is required').notEmpty(),
    check('openHours','Field openHours is required').notEmpty(),
    check('address','Field address is required').notEmpty(),
    check('phoneNumber','Field phoneNumber is required').notEmpty(),
    check('description','Field description is required').notEmpty(),
    check('latitude','Field latitude is required and needs to be a valid number').notEmpty().isNumeric(),
    check('longitude','Field longitude is required and needs to be a valid number').notEmpty().isNumeric(),
    validateFields,
], createPlace);

router.get('/',[
    validateJWT,
], getPlaces)

router.put('/:placeID', [
    validateJWT,
    validateRolesPermissions(['SUPER_ADMIN_ROLE']),
    check('placeID','Field placeID must be a valid Mongo id').isMongoId(),
    check('placeID').custom( existsPlaceByID ),
    validateFields,
], updatePlace)

router.delete('/:placeID', [
    validateJWT,
    validateRolesPermissions(['SUPER_ADMIN_ROLE']),
    check('placeID','Field placeID must be a valid Mongo id').isMongoId(),
    check('placeID').custom( existsPlaceByID ),
    validateFields,
], deletePlace)



//Exports
module.exports = router;