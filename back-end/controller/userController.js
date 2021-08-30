const userModel = require("../model/user_model").users;
const BSC = require("./basecontroller")

async function validEmail(email) {
    var femail = await BSC.BfindOne(userModel, {email})
    if (femail) {
        return false;
    } else {
        return true;
    }
}

exports.register = async (req, res) => {
    if (await validEmail(req.body.email)) {
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