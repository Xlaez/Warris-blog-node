const { USER } = require("../models/app.model");

const saveUserData = async (req, res) => {
    var image = req.file;
    var body = req.body;
    var id = req.get("userAccess");
    var user = await USER.findById(id).catch(
        err => {
            return res.status(400).json({ status: "fail", err });
        }
    )
    if (!user) return res.status(401).json({ status: "fail", message: "User not found" });
    var pre = {
        username: user.username,
        password: user.password,
    }
    var update = {
        username: pre.username,
        password: pre.password,
        image: image.path,
        ...body,
    }
    await USER.findByIdAndUpdate(id, update);
    delete update.password;
    return res.status(201).json({ status: "success", data: update });
}

const deleteUser = async (req, res) => {
    var { id } = req.params;
    await USER.findByIdAndDelete(id).catch(
        err => { return res.status(401).json({ status: "fail", err }) }
    )
    return res.status(201).json({ status: "success" })
}

const getUsers = async (req, res) => {
    var users = await USER.find().sort({
        createdAt: "desc",
    }).catch(err => { return res.status(400).json({ "status": "fail", err }) });
    delete users.password;
    return res.status(200).json({ status: "success", data: users });
}

const getSingleUser = async (req, res) => {
    var { id } = req.params;
    var users = await USER.findById(id)
    if (!users) return res.status(400).json({ status: "fail" })

    return res.status(200).json({ status: "success", data: users });
}

const makeAdmin = async (req, res) => {
    var user = await USER.findById(req.params.id);
    if (!user) return res.status(400).json({ status: "fail" });
    user.role = "admin";
    user = await user.save();
    delete user.password;
    return res.status(200).json({ status: "success", data: user })
}

const setLightTheme = async (req, res) => {
    var user = await USER.findById(req.get("userAccess"));
    if (!user) return res.status(400).send("error");
    user.darkMode = true;
    user = await user.save();
    return res.status(201).json({ status: "success" })
}

const setAnimations = async (req, res) => {
    var user = await USER.findById(req.get("userAccess"));
    if (!user) return res.status(400).send("error");
    user.animations = true;
    user = await user.save();
    return res.status(201).json({ status: "success" })
}
module.exports = {
    saveUserData,
    deleteUser,
    getSingleUser,
    getUsers,
    makeAdmin,
    setLightTheme,
    setAnimations
}