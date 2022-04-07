const { DRAFTS } = require("../models/app.model")

const createDraft = async (req, res) => {
    var draft = new DRAFTS({
        ...req.body,
        userId: req.get("userAccess"),
    });
    draft = await draft.save();
    return res.status(201).json({ status: "success" })
}

const deleteDraft = async (req, res) => {
    await DRAFTS.findByIdAndDelete(req.params.id);
    return res.status(201).json({ status: "success" })
}

const fetchDraft = async (req, res) => {
    var draft = await DRAFTS.findById(req.params.id);
    if (!draft) return res.status(400).json({ status: "fail" });
    return res.status(200).json({ status: "success", data: draft })
}

const fetchDrafts = async (req, res) => {
    var draft = await DRAFTS.find({ userId: req.get("userAccess") }).sort({
        createdAt: "desc",
    }).limit(1);
    if (!draft) return res.status(400).json({ status: "fail" });
    return res.status(200).json({ status: "success", data: draft })
}
module.exports = {
    createDraft,
    deleteDraft,
    fetchDraft,
    fetchDrafts
}