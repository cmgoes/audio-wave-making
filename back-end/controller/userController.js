const userModel = require("../model/user_model").users;
const BSC = require("./basecontroller")

async function existsEmail(email) {
    var femail = await BSC.BfindOne(userModel, {email})
    if (femail) {
        return femail;
    } else {
        return false;
    }
}

exports.register = async (req, res) => {
    if (!await existsEmail(req.body.email)) {
        var user = new userModel(req.body)
        user.password = user.generateHash(user.password)
        
        var sdata = await BSC.data_save(user, userModel);
        if (sdata) {
            return res.json({
                status: true,
                data: sdata
            })
        } else {
            return res.json({
                status: false,
                data: BSC.TEXT_SERVER_ERROR
            })
        }
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_EMAIL_DUPLICATED
        })
    }
}

exports.login = async (req, res) => {
    var user = await existsEmail(req.body.email);
    if (user) {
        if (user.validPassword(req.body.password, user.password)) {
            return res.json({
                status: true,
                data: user
            })
        } else {
            return res.json({
                status: false,
                data: BSC.TEXT_INVALID_PASSWORD
            })
        }
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_EMAIL_NOT_EXISTS
        })
    }
}