const { Router } = require('express');
const { check } = require('express-validator');
const { updateImageCloudinary } = require('../controllers/uploads.controller');
const { isValidCollection } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');
const { validateFileUpload } = require('../middlewares/validate_files');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = new Router();

router.put('/:collection/:id',[
    validateJWT,
    validateFileUpload,
    check('collection').custom((colllection) => isValidCollection(colllection,['pqrs','clasificados'])),
    check('id','This is not a valid ID in our database').isMongoId(),
    validateFields,
], updateImageCloudinary);


//Exports
module.exports = router;