const BSC = require('./basecontroller')
const colorModel = require('../model/color_model').colors

exports.addColor = async (req, res) => {
    var data = await BSC.data_save({ user_id: req.body.user_id, name: req.body.name, color: req.body.color, publish: req.body.publish }, colorModel)
    if (data) {
        this.getColors(req, res)
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}

exports.getColorsByUserId = async (req, res) => {
    const { user_id } = req.body;
    var data = await BSC.Bfind(colorModel, { $or: [{ user_id }, { publish: true }] })
    if (data) {
        return res.json({
            status: true,
            data
        })
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}

exports.getPublicColors = async (req, res) => {
    var data = await BSC.Bfind(colorModel, { publish: true })
    if (data) {
        return res.json({
            status: true,
            data
        })
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}