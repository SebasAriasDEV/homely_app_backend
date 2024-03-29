const { request, response } = require("express");


const validateFileUpload = ( req = request, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
        return res.status(400).json({
            response: 'Error',
            msg:'No files were uploaded'
        });
       }

    next();

}

//Exports
module.exports = {
    validateFileUpload,
}