const { ROLES, USER, ARTICLES, MESSAGES } = require("../models/app.model")

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
    return res.status(200).json({ status: "success", data: user.name })
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

const getTotalAuthors = async (req, res) => {
    var total = await USER.find({ role: "author" }).countDocuments();
    if (!total) return res.status(400).json({ status: "fail" });
    return res.status(200).json({ data: total, status: "success" })
}

const getTotalEditors = async (req, res) => {
    var total = await USER.find({ role: "editor" }).countDocuments();
    if (!total) return res.status(400).json({ status: "fail" });
    return res.status(200).json({ data: total, status: "success" });
}

const getTotalArticles = async (req, res) => {
    var total = await ARTICLES.find().countDocuments();
    if (!total) return res.status(400).json({ status: "fail" });
    return res.status(200).json({ data: total, status: "success" });
}

const getAllAuthors = async (req, res) => {
    var allAuthors = await USER.find({ role: "author" }).sort({
        name: "desc",
    })
    if (!allAuthors) return res.status(400).json({ status: "fail" });
    return res.status(200).json({ status: "success", data: allAuthors });
}

const getAllEditors = async (req, res) => {
    var allEditors = await USER.find({ role: "editor" }).sort({
        name: "desc",
    })
    if (!allEditors) return res.status(400).json({ status: "fail" });
    return res.status(200).json({ status: "success", data: allEditors });
}

const getAuthorWithHighestArticles = async (req, res) => {
    var author = await ARTICLES.find().sort(

    ).limit(1)
    if (!author) return res.status(400).json({ status: "fail" })
    return res.status(200).json({ status: "success", data: author.author });
}

const sendMsg = async (req, res) => {
    var { to } = req.body;
    var user = await USER.findOne({ email: to });
    if (!user) return res.status(400).json({ status: "fail", message: "No user found" })
    var userId = user._id;
    const msg = await MESSAGES.create({
        message: {
            text: req.body.text,
            from: req.body.from,
            to: userId,
        }
    })
    return res.status(201).json({ status: "success" })
}

const deleteRequests = async (req, res) => {
    await ROLES.findByIdAndDelete(req.params.id).catch(
        err => { return res.status(400).json({ status: "fail", err }) }
    )
    return res.status(200).json({ status: "success" });
}

const acceptRequest = async (req, res) => {
    var role = req.body.role;
    if (role == "editor") {
        var user = await USER.findById(req.params.id);
        if (!user) return res.status(400).json({ status: "fail" });
        user.role = "editor";
        user = await user.save();
        delete user.password;
        await ROLES.findByIdAndDelete(req.params.id).catch(
            err => { return res.status(400).json({ status: "fail", err }) }
        )
        return res.status(200).json({ status: "success" })
    }
    if (role == "admin") {
        var user = await USER.findById(req.params.id);
        if (!user) return res.status(400).json({ status: "fail" });
        user.role = "admin";
        user = await user.save();
        delete user.password;
        await ROLES.findByIdAndDelete(req.params.id).catch(
            err => { return res.status(400).json({ status: "fail", err }) }
        )
        return res.status(200).json({ status: "success" })
    }
}

const getUserByEmail = async (req, res) => {

    var { email } = req.body;
    var isUser = await USER.findOne({ email: email });
    if (!isUser) return res.status(400).json({ status: "fail" });
    delete isUser.password;
    return res.status(200).json({ status: "success", data: isUser })
}

module.exports = {
    getEditorRequest,
    makeAdmin,
    makeEditor,
    reviewArticle,
    getTotalAuthors,
    getTotalEditors,
    getTotalArticles,
    getAllAuthors,
    getAllEditors,
    getAuthorWithHighestArticles,
    sendMsg,
    deleteRequests,
    acceptRequest,
    getUserByEmail
}