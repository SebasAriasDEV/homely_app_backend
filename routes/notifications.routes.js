const { Router } = require('express');
const { check } = require('express-validator');

const { updateNotification, getNotifications } = require('../controllers/notification.controller');
const { existsNotificationByID } = require('../helpers/db_validators');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_jwt');

const router = new Router();

//Get notifications
router.get('/', [
    validateJWT,
], getNotifications);

//Update notification status
router.put('/:notificationID',[
    validateJWT,
    check('notificationID','The notificationID is required and needs to be a valid mongo ID').isMongoId(),
    check('notificationID').custom( (notificationID) => existsNotificationByID( notificationID )),
    check('read','Status read is required [true,false]').notEmpty(),
    validateFields,
], updateNotification);


//Exports
module.exports = router;