const { Router } = require('express');
const { check } = require('express-validator');
const { createClasificado, getClasificados, updateClasificado, deleteClasificado } = require('../controllers/clasificados.controller');
const { existsClasificadoByID } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateRolesPermissions } = require('../middlewares/validate_roles_permissions');



const router = new Router();


//Create Clasificado
router.post('/',[
    validateJWT,
    validateRolesPermissions(['USER_ROLE','ADMIN_ROLE']),
    check('title','Title is required').notEmpty(),
    check('content','Content is required').notEmpty(),
    validateFields,
], createClasificado);

// Get PQRS
router.get('/',[
    validateJWT,
], getClasificados);

// //Update an Clasificado
router.put('/:clasificadoID',[
    validateJWT,
    validateRolesPermissions(['ADMIN_ROLE','USER_ROLE']),
    check('clasificadoID','Clasificado ID must be a valid Mongo ID').isMongoId(),
    check('clasificadoID').custom((clasificadoID) => existsClasificadoByID(clasificadoID)),
    validateFields,
], updateClasificado)

// // //Delete an Clasificado
router.delete('/:clasificadoID',[
    validateJWT,
    validateRolesPermissions(['ADMIN_ROLE','USER_ROLE']),
    check('clasificadoID','Clasificado ID must be a valid Mongo ID').isMongoId(),
    check('clasificadoID').custom((clasificadoID) => existsClasificadoByID(clasificadoID)),
    validateFields,
], deleteClasificado)




//Exports
module.exports = router;