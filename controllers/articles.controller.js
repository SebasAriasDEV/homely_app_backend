const { request, response } = require("express");
const { deleteFileCloudinary } = require("../helpers/upload_files");
const { Article } = require("../models");



const createArticle =  async ( req = request, res = response ) => {

    const { title, content, keyWord } = req.body;

    const newArticle = Article({ 
        user: req.authenticatedUser._id,
        building: req.authenticatedUser.building,
        title,
        content,
        keyWord,
        createdAt: new Date(),
     });
    
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
         newArticle: newArticle.toJSON(),
     });
}

const getArticles = async ( req = request, res = response ) => {

    const { building } = req.authenticatedUser;
    const articlesFound = await Article.find({ building, isDeleted:false })
                            .populate('user','unit')
                            .populate('building','name');
    const totalArticles = await Article.find({ building, isDeleted:false }).countDocuments();

    res.status(200).json({
        totalArticles,
        articlesFound,
    });

}

const updateArticle = async ( req = request, res = response ) => {

    const { articleID } = req.params;
    const { user, building, isDeleted, ...rest } = req.body;

    const updatedArticle = await Article.findByIdAndUpdate( articleID, rest );

    res.status(200).json({
        msg: 'Article has been updated correctly.',
        updatedArticle,
    });


}

const deleteArticle = async ( req = request, res = response ) => {

    const { articleID } = req.params;

    const deletedArticle = await Article.findByIdAndUpdate( articleID, { isDeleted:true, img:'deleted'});

    //Delete Image if existing
    if( deletedArticle.img ){
        deleteFileCloudinary( 'articles', deletedArticle.img );
    }

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