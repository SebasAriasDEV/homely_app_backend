const { request, response, json } = require("express");
const { Notification } = require("../models");


const getNotifications = async ( req = request, res = response ) => {

    const { id:userID } = req.authenticatedUser;

    const foundNotifications = await Notification.find({ user: userID });
    const totalNotifications = await Notification.find({ user: userID }).countDocuments();

    res.status(200).json({
        totalNotifications,
        foundNotifications,
    });

}

const updateNotification = async ( req = request, res = response ) => {

    const { read } = req.body;
    const { notificationID } = req.params;

    const { _id:userID} = req.authenticatedUser;
    const foundNotification = await Notification.findById( notificationID );

    //Validate the ownership of the Notification
    if( foundNotification.user.toString() !== userID.toString() ){
        return res.status(400).json({
            msg: 'The authenticated user can only change the status of his own Notifications',
        });
    }

    const updatedNotification = await Notification.findByIdAndUpdate( notificationID, { read });

    res.status(200).json({
        msg: 'The notification has been updated',
        updatedNotification,
        read,
    });
}


//Exports
module.exports = {
    getNotifications,
    updateNotification,
}