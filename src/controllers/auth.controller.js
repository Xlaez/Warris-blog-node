const { hashSync, compareSync } = require('bcryptjs');
const { sign } = require('jsonwebtoken')
require('dotenv').config();
const { USER } = require('../models/app.model')
var TOKEN_SECRET = process.env.ACCESSTOKEN;

assignToken = (user) => {
    return sign({ id: user._id }, TOKEN_SECRET, {
        expiresIn: 36000,
    });
};

const signup = async (req, res) => {
    var body = req.body;
    const isUser = await USER.findOne({ username: body.username });
    if (isUser) return res.status(403).json({ status: "fail", message: "This user already exists" })
    var users = new USER({
        username: body.username,
        password: hashSync(body.password, 11),
    })
    var token = assignToken(users);
    users.save();
    return res.status(201).json({ message: "User created", token: token, userId: users._id, status: "success" });
}

const signin = async (req, res) => {
    var body = req.body;
    var user = await USER.findOne({ username: body.username });
    if (!user) return res.status(403).json({ message: "User doesn't exist", status: "Fail" });
    var validPassword = compareSync(body.password, user.password);
    if (!validPassword) return res.status(403).json({ message: "This user's credential is wrong", status: "Fail" });
    var token = assignToken(user);
    return res.status(200).json({ message: "User confirmed", status: "success", token: token, userId: user._id });
}




module.exports = {
    signup,
    signin
}