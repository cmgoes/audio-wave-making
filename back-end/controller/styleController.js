const BSC = require('./basecontroller')
const colorModel = require('../model/color_model').colors

exports.addColor = async (req, res) => {
    var data = await BSC.data_save({user_id: String(Date.now()), name: req.body.name, color: req.body.color}, colorModel)
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