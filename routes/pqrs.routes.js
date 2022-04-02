const { Router } = require('express');
const { check } = require('express-validator');

const { createPQR, getPQRS, updatePQR, deletePQR } = require('../controllers/pqrs.controller');
const { existsPQRByID } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateRolesPermissions } = require('../middlewares/validate_roles_permissions');

const router = new Router();


//Create PQR
router.post('/',[
    validateJWT,
    validateRolesPermissions(['USER_ROLE']),
    check('content','The content of the PQR is required').notEmpty(),
    validateFields,
], createPQR);

// Get PQRS
router.get('/',[
    validateJWT,
], getPQRS);

//Update an PQR
router.put('/:pqrID',[
    validateJWT,
    validateRolesPermissions(['ADMIN_ROLE','USER_ROLE']),
    check('pqrID','PQR ID must be a valid Mongo ID').isMongoId(),
    check('pqrID').custom((pqrID) => existsPQRByID(pqrID)),
    validateFields,
], updatePQR)

// //Delete an PQR
router.delete('/:pqrID',[
    validateJWT,
    validateRolesPermissions(['ADMIN_ROLE','USER_ROLE']),
    check('pqrID','PQR ID must be a valid Mongo ID').isMongoId(),
    check('pqrID').custom((pqrID) => existsPQRByID(pqrID)),
    validateFields,
], deletePQR)




//Exports
module.exports = router;