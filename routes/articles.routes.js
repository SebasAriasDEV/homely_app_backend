const { Router } = require('express');
const { check } = require('express-validator');

const { getArticles, createArticle, updateArticle, deleteArticle } = require('../controllers/articles.controller');
const { existsArticleByID } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');
const { validateRolesPermissions } = require('../middlewares/validate_roles_permissions');


const router = new Router();

//Create Article
router.post('/',[
    validateJWT,
    validateRolesPermissions(['ADMIN_ROLE']),
    check('title','Title of the article is required').notEmpty(),
    check('content','Content of the article is required').notEmpty(),
    check('keyWord','KeyWord of the article is required').notEmpty(),
    validateFields,
], createArticle);

//Get Articles
router.get('/',[
    validateJWT,
], getArticles);

//Update an Article
router.put('/:articleID',[
    validateJWT,
    validateRolesPermissions(['ADMIN_ROLE']),
    check('articleID','Article ID must be a valid Mongo ID').isMongoId(),
    check('articleID').custom((articleID) => existsArticleByID(articleID)),
    validateFields,
], updateArticle)

//Delete an Article
router.delete('/:articleID',[
    validateJWT,
    validateRolesPermissions(['ADMIN_ROLE']),
    check('articleID','Article ID must be a valid Mongo ID').isMongoId(),
    check('articleID').custom((articleID) => existsArticleByID(articleID)),
    validateFields,
], deleteArticle)


//Exports
module.exports = router;