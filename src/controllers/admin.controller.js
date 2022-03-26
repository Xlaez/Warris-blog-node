const { ROLES, USER, ARTICLES } = require("../models/app.model")

const getEditorRequest = async (req, res) => {
    var request = await ROLES.find().sort({
        createdAt: -1
    })
    if (!request) return res.status(400).json({ status: "fail" })
    return res.status(200).json({ status: "success", data: request })
}

const makeAdmin = async (req, res) => {
    var user = await USER.findById(req.params.id);
    if (!user) return res.status(400).json({ status: "fail" });
    user.role = "admin";
    user = await user.save();
    delete user.password;
    return res.status(200).json({ status: "success", data: user })
}

const makeEditor = async (req, res) => {
    var user = await USER.findById(req.params.id);
    if (!user) return res.status(400).json({ status: "fail" });
    user.role = "editor";
    user = await user.save();
    delete user.password;
    return res.status(200).json({ status: "success", data: user })
}

const reviewArticle = async (req, res) => {
    var { id } = req.params;
    var article = await ARTICLES.findById(id);
    if (!article) return res.status(400).json({ status: "fail" });
    var rating = article.rating;
    var isReviewed = article.isReviewed;
    rating = rating + 2;
    isReviewed = true
    var body = {
        rating,
        isReviewed
    }
    var update = await ARTICLES.findByIdAndUpdate(id, body);
    if (!update) return res.status(400).json({ status: "fail" });
    return res.status(201).json({ status: "success" })
}



module.exports = {
    getEditorRequest,
    makeAdmin,
    makeEditor,
    reviewArticle
}