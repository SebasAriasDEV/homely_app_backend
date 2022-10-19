const bcrypt = require("bcryptjs");
const { response } = require("express");
const { request } = require("express");
const { generateJWT } = require("../helpers/generate_JWT");

const { User } = require('../models');


const authLogin = async (req = request, res = response ) => {

    const { email, password } = req.body;

    //Check if email exists
    const userFound = await User.findOne({ email });
    if ( !userFound ){
        let errors = [
            {
                msg: `User with email ${email} does NOT exist`,
                param: 'email',
                location: 'body'
            }
        ];
        return res.status(400).json({
            errors
        });
    }

    //Validate Password
    const passwordOK = bcrypt.compareSync( password, userFound.password);
    if( !passwordOK ){
        let errors = [
            {
                msg: 'Email and password do NOT match',
                param: 'emailOrPassword',
                location: 'body'
            }
        ];
        return res.status(400).json({
            errors
        });
    }

    //Generate JWT
    const token = await generateJWT( userFound._id);

    res.status(200).json({
        userFound,
        token,
    });
}

const renewToken = async(req = request, res = response ) => {

    //Si llegó hasta aca es porque el TOKEN si es valido
    userFound = req.authenticatedUser;
    //Generate JWT
    const token = await generateJWT( userFound._id);

    return res.status(200).json({
        userFound,
        token,
    });
}

//Exports
module.exports = {
    authLogin,
    renewToken
}