const userModel = require("../model/user_model").users;
const sessionModel = require("../model/user_model").session;
const BSC = require("./basecontroller")
const md5 = require("md5")
const config = require("../db");

async function existsEmail(email) {
    var femail = await BSC.BfindOne(userModel, { email })
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
            const session_token = md5(new Date())
            var session = new sessionModel({ user_id: sdata._id, session_token, expire_time: Date.now() + config.EXPIRE_TIME })
            var sedata = await BSC.data_save(session, sessionModel)
            if (sedata) {
                return res.json({
                    status: true,
                    data: {
                        session_token,
                        userData: sdata
                    }
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
            const session_token = md5(new Date())
            var session = new sessionModel({ user_id: user._id, session_token, expire_time: Date.now() + config.EXPIRE_TIME })
            var sedata = await BSC.data_save(session, sessionModel)
            if (sedata) {
                return res.json({
                    status: true,
                    data: {
                        session_token,
                        userData: user
                    }
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