const { request, response } = require("express");
const { Article } = require("../models");



const createArticle =  async ( req = request, res = response ) => {

    
    const { title, content} = req.body;

    const newArticle = Article({ 
        user: req.authenticatedUser._id,
        building: req.authenticatedUser.building,
        title,
        content,
     });

     console.log(newArticle);
    
     try {
         
         await newArticle.save();
     } catch (error) {
         console.log(error);
         return res.status(500).json({
             msg: error.toString(),
         });
     }


     res.status(200).json({
         msg: 'Article has been created successfully',
         newArticle,
     });
}

const getArticles = async ( req = request, res = response ) => {

    const { building } = req.authenticatedUser;
    const articlesFound = await Article.find({ building, isActive:true })
                            .populate('user','email')
                            .populate('building','name');
    const totalArticles = await Article.find({ building, isActive:true }).countDocuments();

    res.status(200).json({
        totalArticles,
        articlesFound,
    });

}

const updateArticle = async ( req = request, res = response ) => {

    const { articleID } = req.params;
    const { user, building, isActive, ...rest } = req.body;

    const updatedArticle = await Article.findByIdAndUpdate( articleID, rest );

    res.status(200).json({
        msg: 'Article has been updated correctly.',
        updatedArticle,
    });


}

const deleteArticle = async ( req = request, res = response ) => {

    const { articleID } = req.params;

    const deletedArticle = await Article.findByIdAndUpdate( articleID, { isActive:false });

    res.status(200).json({
        msg: 'Article has been deleted.',
        deletedArticle,
    });


}



//Exports
module.exports = {
    createArticle,
    getArticles,
    updateArticle,
    deleteArticle
}