const { ARTICLES, USER, COMMENTS } = require("../models/app.model");

const createArticle = async (req, res) => {
    var body = req.body;
    var userId = req.get("userAccess");
    var image = req.file;
    if (!userId) return res.status(403).json({ message: "UserId expected but got none", status: "fail" });
    var authorData = await USER.findOne({ _id: userId });
    if (!authorData) return res.status(400).json({ message: "Something is critically wrong", status: "fail" });
    var articles = new ARTICLES({
        ...body,
        author: authorData.name,
        image: image.path,
        userId: userId
    });
    articles = await articles.save();
    return res.status(201).json({ message: "Article created successfully", status: "Success", title: articles.title });
}

const getSingleArticle = async (req, res) => {
    var { id } = req.params;
    var article = await ARTICLES.findById(id);
    if (!article) return res.status(400).json({ message: "Check the request parameter again", status: "fail" });
    return res.json({ status: "success", data: article });
}

const getArticles = async (req, res) => {
    var article = await ARTICLES.find().sort(
        { createdAt: "desc" }
    ).catch(err => {
        return res.status(400).json({ status: "fail", err })
    })
    return res.status(200).json({ status: "success", data: article })
}

const editArticle = async (req, res) => {
    var { id } = req.params;
    var body = req.body;
    var image = req.file;
    var data = {
        title: body.title,
        description: body.description,
        content: body.content,
        image: image.path,
    }
    var article = await ARTICLES.findByIdAndUpdate(id, data);
    return res.status(201).json({ status: "success", data: article })
}

const deleteArticle = async (req, res) => {
    var { id } = req.params;
    await ARTICLES.findByIdAndDelete(id).catch(
        err => { return res.status(400).json({ status: "fail", err }) }
    )
    return res.status(201).json({ status: "success", message: "deleted" })
}

const addLike = async (req, res) => {
    var { id } = req.params;
    var article = await ARTICLES.findById(id);
    if (!article) return res.status(400).send("Error");
    article.likes = article.likes + 1;
    article = await article.save();
    return res.status(201).json({ status: "success" })
}

const removeLike = async (req, res) => {
    var { id } = req.params;
    var article = await ARTICLES.findById(id);
    if (!article) return res.status(400).send("Error");
    article.likes = article.likes - 1;
    article = await article.save();
    return res.status(201).json({ status: "success" })

}

const addComments = async (req, res) => {
    const result = await COMMENTS.create({
        comments: {
            text: req.body.text,
            ids: [req.get("userAccess"), req.body.to],
            sender: req.get("userAccess")
        }
    })
    if (!result) return res.status(400).json({ status: "fail" });
    return res.status(201).json({ status: "success", data: result })
}

const getComments = async (req, res) => {
    var to = req.params.id;
    var comments = await COMMENTS.find({
        ids: {
            $all: to,
        },
    })
    var validParam = comments[1].comments.ids[1]
    if (to !== validParam) return res.status(400).send("not this article")
    var result = comments.map((com) => {
        return {
            commentorId: com.comments.sender.toString(),
            comment: com.comments.text,
        }
    })
    return res.status(200).json({ status: "success", data: result })
}

const setViews = async (req, res) => {
    var views = await ARTICLES.findById(req.params.id);
    if (!views) return res.status(400).send("critical error");
    views.views = views.views + 1;
    views = await views.save();
    return res.status(201).json({ status: "success" })
}



const getMostLikedArticle = async (req, res) => {
    var article = await ARTICLES.find({ userId: req.params.id }).sort(
        { "likes": -1 }).limit(1)
    return res.json({ article })

}

const getMostViewedArticle = async (req, res) => {
    var article = await ARTICLES.find({
        userId: req.params.id
    }).sort({ "views": -1 }).limit(1)
    return res.json({ article });

}

const getLatestArticle = async(req, res)=>{
    var article = await ARTICLES.find({userId:req.params.id}).sort({
        "createdAt":-1
    }).limit(1)
    return res.status(200).json({article})
}

const getAllUserArticles = async (req, res) => {
    var { id } = req.params
    var article = await ARTICLES.find({ userId: id }).countDocuments();
    return res.status(200).json({ status: "success", data: article })
}

const getAllViewedUserArticle = async (req, res) => {
    var totalViews = 0
    var article = await ARTICLES.find({ userId: req.params.id });
    article.map((item) => {
        totalViews = item.views + totalViews;
    })
    return res.status(200).json({ totalViews })
}

const getTotalLikedUserArticle = async (req, res) => {
    var totalLikes = 0;
    var { id } = req.params;
    var likesPros = await ARTICLES.find({ userId: id });
    likesPros.map((item) => {
        totalLikes = item.likes + totalLikes;
    })
    return res.status(200).json({ totalLikes })
}


const getlatesThreeArticles = async(req, res)=>{
    var articles = await ARTICLES.find().sort({
        "createdAt": -1
    })   .limit(3)
    return res.status(200).json({status:"success", data:articles});

}

const getThreeMostViewed = async(req, res)=>{
    var articles = await ARTICLES.find().sort({
        "views": -1
    }).limit(3)
    return res.status(200).json({status:"success", data:articles})
}

const getThreeMostLikes = async(req, res)=>{
    var articles = await ARTICLES.find().sort({
        "likes": -1
    }).limit(3)
    return res.status(200).json({status:"success", data:articles})
}

module.exports = {
    createArticle,
    getSingleArticle,
    editArticle,
    getArticles,
    deleteArticle,
    addLike,
    removeLike,
    addComments,
    getComments,
    getMostLikedArticle,
    setViews,
    getMostViewedArticle,
    getAllUserArticles,
    getAllViewedUserArticle,
    getTotalLikedUserArticle,
    getLatestArticle,
    getlatesThreeArticles,
    getThreeMostViewed,
    getThreeMostLikes
}