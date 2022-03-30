const { Router } = require('express');
const { getArticles, createArticle } = require('../controllers/articles.controller');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateRolesPermissions } = require('../middlewares/validate_roles_permissions');


const router = new Router();

//Create Article
router.post('/',[
    validateJWT,
    validateRolesPermissions(['ADMIN_ROLE']),
    validateFields,
], createArticle);

//Get Articles
router.get('/',[
    validateJWT,
], getArticles);


//Exports
module.exports = router;