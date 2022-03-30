const { request, response } = require("express");


const validateRolesPermissions = ( roles = [] ) => {
    return (req = request, res = response, next) => {

        if (!roles.includes(req.authenticatedUser.role)) {
            return res.status(401).json({
                msg: `Service requires one of this roles: ${ roles }`
            });
        }
        
        next();
    }
}



//Exports
module.exports = {
    validateRolesPermissions,
}