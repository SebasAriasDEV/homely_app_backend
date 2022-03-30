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
        return res.status(400).json({
            msg: `User with email ${email} does NOT exist.`
        });
    }

    //Validate Password
    const passwordOK = bcrypt.compareSync( password, userFound.password);
    if( !passwordOK ){
        return res.status(400).json({
            msg: 'Email and password does NOT match.'
        });
    }

    //Generate JWT
    const token = await generateJWT( userFound._id);

    res.status(200).json({
        msg: 'Login',
        userFound,
        token,
    });
}

//Exports
module.exports = {
    authLogin,
}