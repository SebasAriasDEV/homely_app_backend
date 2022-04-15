const { request, response } = require("express");
const { Message, User, PQR, Notification } = require("../models");


const createMesssage = async ( req = request, res = response ) => {

    const { content } = req.body;
    const { pqrID } = req.params;
    const { _id:userID, building } = req.authenticatedUser;

    let newMessage;
    let newNotification;
    let receiver;
    
    //If the current user is ADMIN
    if ( req.authenticatedUser.role === 'ADMIN_ROLE'){
        const { user:pqrUser } = await PQR.findById( pqrID );
        receiver = pqrUser._id;
    } else {  
        //If the current user is a normal USER
        const { _id:adminUserID } = await User.findOne({ building, role:'ADMIN_ROLE' });
        receiver = adminUserID
    }

    //Create message content
    newMessage = new Message({ 
        pqr: pqrID,
        author: userID,
        receiver,
        building,
        content,
        createdAt: new Date(),
    });

    //Create notification
    newNotification = new Notification({
        type: 'Message',
        content: `New message from ${req.authenticatedUser.firstName} ${req.authenticatedUser.lastName}`,
        user: receiver,
    });

    await newNotification.save();
    await newMessage.save();
        
    res.status(200).json({
        msg:'OK',
        newMessage,
    });
}

const getMessages = async ( req =  request, res = response) => {

    const { _id:userID } = req.authenticatedUser; 
    const { pqrID } = req.params;

    const messages = await Message.find({ 
        pqr: pqrID,
        isDeleted: false,
        $or: [{ author: userID },{ receiver: userID }],
    }).populate('author','unit');

    res.status(200).json({
        messages,
    });
}

//Exports
module.exports = {
    createMesssage,
    getMessages,
}