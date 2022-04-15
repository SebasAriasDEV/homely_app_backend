const { Router } = require('express');
const { check } = require('express-validator');

const { getAllBuildings, createBuilding } = require('../controllers/buildings.controller');
const { buildingNameExists } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateRolesPermissions } = require('../middlewares/validate_roles_permissions');


const router = new Router();

router.get('/', getAllBuildings );

router.post('/createBuilding',[
    validateJWT,
    validateRolesPermissions(['SUPER_ADMIN_ROLE']),
    check('name', 'Name of building is required').notEmpty(),
    check('name').custom((name)=> buildingNameExists(name)),
    check('latitude', 'Latitude of building is required and must be a number').notEmpty().isNumeric(),
    check('longitude', 'Longitude of building is required and must be a number').notEmpty().isNumeric(),
    validateFields
], createBuilding );


//Exports
module.exports = router;