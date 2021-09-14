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

exports.getColors = async (req, res) => {
    var data = await BSC.Bfind(colorModel, {})
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
    var data = await BSC.Bfind(colorModel, { public: true })
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