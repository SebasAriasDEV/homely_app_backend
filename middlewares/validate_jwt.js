const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const { User } = require('../models');

const validateJWT = async ( req = request, res = response, next ) => {

    const token  = req.headers['x-token'];

    if( !token ){
        return res.status(401).json({
            msg: 'There is no authenticated token in the request.'
        });
    }

    try {
        const { uid, ...rest } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        //Look for the authenticated user
        const authenticatedUser = await User.findOne({ _id: uid, isActive: true });
        if( !authenticatedUser ){
            return res.status(401).json({
                msg: 'Token is invalid'
            });
        }

        req.authenticatedUser = authenticatedUser;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token is invalid',
        });
        
    }
    
}

//Exports
module.exports = {
    validateJWT
}

