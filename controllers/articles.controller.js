const { request, response } = require("express");
const { Article } = require("../models");



const createArticle =  async ( req = request, res = response ) => {

    
    const { title, content} = req.body;
    const {_id:user, building} = req.authenticatedUser;

    const newArticle = new Article({ 
        user,
        building,
        title,
        content,
     });
    
     await newArticle.save();

     res.status(200).json({
         msg: 'Article has been created successfully',
         newArticle,
     });
}

const getArticles = async ( req = request, res = response ) => {

    const { building } = req.authenticatedUser;
    const articlesFound = await Article.find({ building })
                            .populate('user','email')
                            .populate('building','name');
    const totalArticles = await Article.find({ building }).countDocuments();

    res.status(200).json({
        totalArticles,
        articlesFound,
    });
    



}



//Exports
module.exports = {
    createArticle,
    getArticles,
}