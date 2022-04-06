const { request, response } = require("express");
const { deleteFileCloudinary } = require("../helpers/upload_files");
const { Clasificado } = require("../models");



const createClasificado =  async ( req = request, res = response ) => {

    
    const { content, title } = req.body;

    const newClasificado = Clasificado({ 
        user: req.authenticatedUser._id,
        building: req.authenticatedUser.building,
        title,
        content,
        createdAt: new Date(),
     });
    
     try {
         await newClasificado.save();
     } catch (error) {
         console.log(error);
         return res.status(500).json({
             msg: error.toString(),
         });
     }


     res.status(200).json({
         msg: 'Clasificado has been created successfully',
         newClasificado,
     });
}

const getClasificados = async ( req = request, res = response ) => {

    const { building } = req.authenticatedUser;
    const clasificadosFound = await Clasificado.find({ building, isDeleted:false })
                            .populate('user','unit')
                            .populate('building','name');
    const totalClasificados = await Clasificado.find({ building, isDeleted:false }).countDocuments();

    res.status(200).json({
        totalClasificados,
        building,
        clasificadosFound,
    });

}

const updateClasificado = async ( req = request, res = response ) => {

    const { clasificadoID } = req.params;
    const { user, building, isDeleted, ...rest } = req.body;

    const updatedClasificado = await Clasificado.findByIdAndUpdate( clasificadoID, rest );

    res.status(200).json({
        msg: 'Clasificado has been updated correctly.',
        updatedClasificado,
    });


}

const deleteClasificado = async ( req = request, res = response ) => {

    const { clasificadoID } = req.params;
    
    const deletedClasificado = await Clasificado.findByIdAndUpdate( clasificadoID, { isDeleted:true, img:'deleted' });

    //Delete Image if existing
    if( deletedClasificado.img ){
        deleteFileCloudinary( 'clasificados', deletedClasificado.img );
    }

    res.status(200).json({
        msg: 'Clasificado has been deleted.',
        deletedClasificado,
    });


}



//Exports
module.exports = {
    createClasificado,
    getClasificados,
    updateClasificado,
    deleteClasificado
}