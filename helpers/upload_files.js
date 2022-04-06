const path = require('path');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('cloudinary').v2
cloudinary.config( process.env.CLOUDINARY_URL);



const uploadFileHelper = ( files, allowedExtentions = ['png', 'jpeg', 'jpg'], folder = '' ) => {

    return new Promise( ( resolve, reject ) => {

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        const { file } = files;
        const splitName = file.name.split('.');
        const extention = splitName[splitName.length -1]

        //Validate Extention
        if( !allowedExtentions.includes(extention) ) {
            return reject(`The extention ${extention} is not allowed. Extentions allowed: ${allowedExtentions}`);
        }

        const tempName = uuidv4() + '.' + extention;
        const uploadPath = path.join( __dirname, '../uploads/', folder, tempName );

        // Use the mv() method to place the file somewhere on your server
        file.mv(uploadPath, (err) => {
            if (err)
            reject( err );

            resolve( tempName );
        });
    }

    );

}

const deleteFileCloudinary = async ( collection = '', imgURL = '') => {

    const urlSplit = imgURL.split('/');
    const name = urlSplit[ urlSplit.length -1 ]; 
    const [ fileName, extenstion ] = name.split('.');

    const public_id = `${ collection }/${ fileName }`;

    await cloudinary.uploader.destroy( public_id );

}

//Exports
module.exports = {
    uploadFileHelper,
    deleteFileCloudinary,
}