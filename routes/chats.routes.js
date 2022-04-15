const { Router } = require('express');
const { check } = require('express-validator');



const { createMesssage, getMessages } = require('../controllers/chats.controller');
const { existsPQRByID } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateRolesPermissions } = require('../middlewares/validate_roles_permissions');

const router = new Router();


router.post('/:pqrID',[
    validateJWT,
    validateRolesPermissions(['USER_ROLE','ADMIN_ROLE']),
    check('pqrID','Field pqrID needs to be a valid PQR in the Database').isMongoId(),
    check('pqrID').custom((pqrID) => existsPQRByID(pqrID)),
    check('content','Field message is required').notEmpty(),
    validateFields,    
], createMesssage );

router.get('/:pqrID',[
    validateJWT,
    validateRolesPermissions(['USER_ROLE','ADMIN_ROLE']),
    check('pqrID','Field pqrID needs to be a valid PQR in the Database').isMongoId(),
    check('pqrID').custom((pqrID) => existsPQRByID(pqrID)),
    validateFields,    
], getMessages);


//Exports
module.exports = router;