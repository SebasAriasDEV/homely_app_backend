const { request, response } = require("express");


//Validar si es del mismo edificio del cual esta haciendo el request
const validateSameBuilding = ( req = request, res = response, next ) => {

    const authBuildingID = req.authenticatedUser.building._id.toString();
    const { buildingID } = req.params;

    if( authBuildingID !== buildingID ){
        return res.status(400).json({
            msg: `The authenticated user ${req.authenticatedUser.email} cannot access information from a different Building than his own Building.`
        });
    }
    
    next();
}

//Validar si es del mismo usuario para acutalizar datos o es ADMIN/SUPER ADMIN
const validateSameUser = ( req = request, res = response, next ) => {

    const authUserID = req.authenticatedUser._id;
    const { uid } = req.params;
    const fullAccessRoles = ['SUPER_ADMIN_ROLE','ADMIN_ROLE'];

    if ( !fullAccessRoles.includes(req.authenticatedUser.role) ){

        if( authUserID !== uid ){
            return res.status(400).json({
                msg: `The authenticated user ${req.authenticatedUser.email} cannot modify information of another user.`
            });
        }

    }

    
    
    next();
}

//Exports
module.exports = {
    validateSameBuilding,
    validateSameUser
}