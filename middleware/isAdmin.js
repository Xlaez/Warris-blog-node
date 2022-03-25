const { USER } = require("../src/models/app.model")

const grantAccess = (req, res, next) => {
    const userId = req.get('userAccess')
    USER.findOne({ _id: userId }).then(
        data => {
            if (!data) return res.status(400).json({ message: "Something went wrong!" })
            var roleAdmin = data.role;
            if (roleAdmin === 'admin') {
                return next();
            } else if (roleAdmin === 'reader')
                return res.status(402).send("You shouldn't be here")
            res.status(400).json({ message: "You are not an admin" })

        }
    ).catch(
        err => {
            return res.status(400).json(err);
        }
    )
}

module.exports = {
    grantAccess
}