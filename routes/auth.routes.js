
const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate_fields');
const { authLogin } = require('../controllers/auth.controller');

const router = new Router();

router.post('/login',[
    check('email','Email is required').notEmpty(),
    check('password','Password is required').notEmpty(),
    validateFields,
], authLogin);


//Exports
module.exports = router;