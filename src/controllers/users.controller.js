const { USER, ROLES } = require("../models/app.model");

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

const requestEditor = async (req, res) => {
    var { id } = req.params;
    var user = await USER.findById(id);
    console.log(user)
    if (!user) return res.status(400).json({ status: "fail" });
    var username = user.name;
    var role = user.role;
    var image = user.image;
    var request = "editor"
    var create = await ROLES.create({
        user: username,
        role: role,
        request: request,
        image: image,
    });
    if (!create) return res.status(400).send("an error")
    return res.status(200).json({ status: "success" });
}

const requestAdmin = async (req, res) => {
    var id = req.params.id
    var user = await USER.findById(id);
    if (!user) return res.status(400).json({ status: "fail" })
    var request = "admin";
    var create = await ROLES.create({
        user: user.name,
        role: user.role,
        request: request,
    });
    if (!create) return res.status(400).send("an error")
    return res.status(200).json({ status: "success" });
}

module.exports = {
    saveUserData,
    deleteUser,
    getSingleUser,
    getUsers,
    setLightTheme,
    setAnimations,
    requestEditor,
    requestAdmin
}