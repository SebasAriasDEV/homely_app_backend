const { Building, User, Role, Article, PQR, Clasificado} = require('../models');

const buildingNameExists = async (name = '') => {

    const existingBuilding = await Building.findOne({ name });

    if (existingBuilding){
        throw new Error(`The building with name: ${name} already exists`);
    }

    return true;
}

const userEmailExists = async (email = '') => {

    const existingUser = await User.findOne({ email, isDeleted: false });

    if (existingUser){
        throw new Error(`The email: ${email} already exists in the Database`);
    }

    return true;
}

const existsBuildingByID = async (uid = '') => {

    const existingBuilding = await Building.findById(uid);

    if (!existingBuilding){
        throw new Error(`The building with ID: ${uid} does NOT exists in the Database`);
    }

    return true;
}

const existsUserByID = async (uid = '') => {

    const existingUser = await User.findOne({ _id: uid, isDeleted: false });

    if (!existingUser){
        throw new Error(`The user with ID: ${uid} does NOT exists in the Database.`);
    }

    return true;
}

const existsArticleByID = async (articleID = '') => {

    const existingArticle = await Article.findOne({ _id: articleID, isDeleted: false });

    if (!existingArticle){
        throw new Error(`The artcile with ID: ${articleID} does NOT exists in the Database.`);
    }

    return true;
}

const existsPQRByID = async (pqrID = '') => {

    const existingPQR = await PQR.findOne({ _id: pqrID, isDeleted: false });

    if (!existingPQR){
        throw new Error(`The PQR with ID: ${pqrID} does NOT exists in the Database.`);
    }

    return true;
}
const existsClasificadoByID = async (clasificadoID = '') => {

    const existingClasificado = await Clasificado.findOne({ _id: clasificadoID, isDeleted: false });

    if (!existingClasificado){
        throw new Error(`The Clasificado with ID: ${clasificadoID} does NOT exists in the Database.`);
    }

    return true;
}

const isValidRole = async (role = '') => {
    
    const foundRole = await Role.findOne({ role });
    
    if( !foundRole ){
        throw new Error(`The role ${role} is not a valid role in our model.`);
    }

    return true;
}


//Exports
module.exports = {
    buildingNameExists,
    userEmailExists,
    existsBuildingByID,
    existsUserByID,
    isValidRole,
    existsArticleByID,
    existsPQRByID,
    existsClasificadoByID
}