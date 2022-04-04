const { request, response } = require("express");

const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);


const { uploadFileHelper } = require("../helpers/upload_files");
const { PQR, Clasificado } = require("../models");

const updateImageCloudinary = async ( req = request, res = response )=> {
    
    const { collection, id } = req.params;

    let model;


    switch(collection){

        case 'pqrs':
            model = await PQR.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `No PQR with the id ${ id }`
                });
            }
        break;
        case 'clasificados':
            model = await Clasificado.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `No Clasificado with the id ${ id }`
                });
            }
        break;
        default:
            return res.status(500).json({
                response: 'Error',
                message: 'Server mistake'
            });
    }

    //Limpiar imagenes

    if ( model.img ){
        const urlSplit = model.img.split('/');
        const name = urlSplit[ urlSplit.length -1 ]; 
        const [ public_id, extenstion ] = name.split('.');

        cloudinary.uploader.destroy( public_id );

    }

    const { tempFilePath } = req.files.file;

    const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

    //Actualizar database
    model.img = secure_url;

    await model.save();

    res.status(200).json({
        response: 'Image was uploaded successfully',
        model
    });

}

//Exports
module.exports = {
    updateImageCloudinary,
}