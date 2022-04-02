const { request, response } = require("express");
const { PQR } = require("../models");



const createPQR =  async ( req = request, res = response ) => {

    
    const { content } = req.body;

    const newPQR = PQR({ 
        user: req.authenticatedUser._id,
        building: req.authenticatedUser.building,
        content,
        createdAt: new Date(),
     });
    
     try {
         await newPQR.save();
     } catch (error) {
         console.log(error);
         return res.status(500).json({
             msg: error.toString(),
         });
     }


     res.status(200).json({
         msg: 'PQR has been created successfully',
         newPQR,
     });
}

const getPQRS = async ( req = request, res = response ) => {

    const { building } = req.authenticatedUser;
    const pqrsFound = await PQR.find({ building, isDeleted:false })
                            .populate('user','unit')
                            .populate('building','name');
    const totalPQRS = await PQR.find({ building, isDeleted:false }).countDocuments();

    res.status(200).json({
        totalPQRS,
        pqrsFound,
    });

}

const updatePQR = async ( req = request, res = response ) => {

    const { pqrID } = req.params;
    const { user, building, isDeleted, ...rest } = req.body;

    //IF PQRS is closed, it cannot be modified anymore
    const existingPQR = await PQR.findById( pqrID );

    if ( existingPQR.isDone === true ){
        return res.status(400).json({
            msg: 'The PQR has been already closed, it cannot be modified anymore.'
        });
    }

    //Check if the PQR is being closed
    if ( rest.isDone === true ){
        console.log('PQRS has been completed');
        rest.completedAt = new Date();
    }

    const updatedPQR = await PQR.findByIdAndUpdate( pqrID, rest );

    res.status(200).json({
        msg: 'PQR has been updated correctly.',
        updatedPQR,
    });


}

const deletePQR = async ( req = request, res = response ) => {

    const { pqrID } = req.params;

    const deletedPQR = await PQR.findByIdAndUpdate( pqrID, { isDeleted:true });

    res.status(200).json({
        msg: 'pqr has been deleted.',
        deletedPQR,
    });


}



//Exports
module.exports = {
    createPQR,
    getPQRS,
    updatePQR,
    deletePQR
}