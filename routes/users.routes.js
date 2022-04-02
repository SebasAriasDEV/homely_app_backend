const { Router } = require('express');
const { check } = require('express-validator');

const { getAllUsers, createUser, getUsersByBuildingID, updateUserInfo, deleteUser } = require('../controllers/users.controller');
const { userEmailExists, existsBuildingByID, existsUserByID, isValidRole } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateRolesPermissions } = require('../middlewares/validate_roles_permissions');
const { validateSameBuilding, validateSameUser } = require('../middlewares/validate_same_building');

const router = new Router();

// ******************* Create ***************************************************
router.post('/createUser',[
    validateJWT,
    validateRolesPermissions(['SUPER_ADMIN_ROLE']),
    check('firstName','First name is required').notEmpty(),
    check('lastName','Last name is required').notEmpty(),
    check('email','Email is required and should be a valid email').notEmpty().isEmail(),
    check('password','Password is required and should have al least 6 characters').notEmpty().isLength({ min: 6 }),
    check('role','Role is required').notEmpty(),
    check('role').custom((role) => isValidRole(role)),
    check('building','Building ID is required').notEmpty(),
    check('building','Building should be a valid mongo ID').isMongoId(),
    check('building').custom((uid) => existsBuildingByID(uid)),
    check('unit','Unit is required').notEmpty(),
    check('email').custom((email) => userEmailExists(email)),
    validateFields,
], createUser );

// ******************* Read ***************************************************
router.get('/',[
    validateJWT,
    validateRolesPermissions(['SUPER_ADMIN_ROLE']),
    validateFields,
], getAllUsers );

router.get('/:buildingID',[
    validateJWT,
    validateSameBuilding,
], getUsersByBuildingID );

// ******************* Update ***************************************************
router.put('/:uid',[
    validateJWT,
    validateSameBuilding,
    validateSameUser,
    check('uid','User ID is required and must be a valid mongo ID').isMongoId(),
    check('uid').custom((uid) => existsUserByID(uid)),
    validateFields
], updateUserInfo );

// ******************* Delete ***************************************************
router.delete('/:uid',[
    validateJWT,
    validateRolesPermissions(['SUPER_ADMIN_ROLE']),
    check('uid','User ID is required and must be a valid mongo ID').isMongoId(),
    check('uid').custom((uid) => existsUserByID(uid)),
    validateFields
], deleteUser );

//Exports
module.exports = router;