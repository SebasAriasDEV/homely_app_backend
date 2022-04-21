const { Router } = require('express');
const { check } = require('express-validator');

const { createFacility, getFacilities, updateFacility, deleteFacility } = require('../controllers/facilities.controller');
const { existsBuildingByID, existsFacilityByID } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateRolesPermissions } = require('../middlewares/validate_roles_permissions');

const router = new Router();


router.post('/', [
    validateJWT,
    validateRolesPermissions(['SUPER_ADMIN_ROLE']),
    check('name','Field name is required').notEmpty(),
    check('building','Field building is required and must be a valid Mongo ID').isMongoId(),
    check('building').custom( existsBuildingByID ),
    check('capacity','Field capacity is required and must be a number').notEmpty().isNumeric(),
    check('startTimeUTC','Field startTimeUTC is required and must be a number').notEmpty().isNumeric(),
    check('endTimeUTC','Field endTimeUTC is required and must be a number').notEmpty().isNumeric(),
    validateFields,
], createFacility);

router.get('/',[
    validateJWT,
], getFacilities );

router.put('/:facilityID',[
    validateJWT,
    validateRolesPermissions(['SUPER_ADMIN_ROLE']),
    check('facilityID','Field facilityID must be a valid Mongo ID').isMongoId(),
    check('facilityID').custom( existsFacilityByID ),
    validateFields,
], updateFacility );

router.delete('/:facilityID',[
    validateJWT,
    validateRolesPermissions(['SUPER_ADMIN_ROLE']),
    check('facilityID','Field facilityID must be a valid Mongo ID').isMongoId(),
    check('facilityID').custom( existsFacilityByID ),
    validateFields,
], deleteFacility );




//Exports
module.exports = router;