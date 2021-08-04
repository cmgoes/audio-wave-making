const BSC = require('./basecontroller');
const AudioModel = require('../model/audio_model').audios
const { exec } = require('child_process');
const path = require('path');
const md5 = require('md5')

const { MUSICURL, JSONURL } = require('../db')

exports.uploadAudio = (req, res, next) => {
    const { filename, originalname } = req.files[0];
    const json_file_name = md5(originalname) + '.json';
    
    exec(`audiowaveform -i ${path.join(MUSICURL, filename)} -o ${path.join(JSONURL, json_file_name)}`, async (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return next();
        }
        
        var sdata = await BSC.data_save({user_id: String(Date.now()), audio_name: filename, json_name: json_file_name, origin_name: originalname}, AudioModel)
        if (sdata) {
            this.getAudios(req, res, next);
        } else {
            return res.json({
                status: false,
                data: BSC.TEXT_SERVER_ERROR
            })
        }
    });

}

exports.getAudios = async (req, res, next) => {
    var data = await BSC.Bfind(AudioModel, {});
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