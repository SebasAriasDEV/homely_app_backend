
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate_fields');
const { authLogin, renewToken } = require('../controllers/auth.controller');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = new Router();

//Login del usuario
router.post('/login',[
    check('email','Email is required').notEmpty(),
    check('password','Password is required').notEmpty(),
    validateFields,
], authLogin);

//Renew token
router.get('/renew',[
    validateJWT,
], renewToken);


//Exports
module.exports = router;