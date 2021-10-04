const BSC = require('./basecontroller');
const AudioModel = require('../model/audio_model').audios
const { exec } = require('child_process');
const Buffer = require('buffer/').Buffer
const path = require('path');
const md5 = require('md5')
const fs = require('fs');

const { MUSICURL, JSONURL } = require('../db')

exports.uploadAudio = (req, res, next) => {
    const { user_id, color, style, text } = req.body;
    const { filename, originalname } = req.files[0];
    const json_file_name = md5(originalname) + '.json';

    exec(`audiowaveform -i ${path.join(MUSICURL, filename)} -o ${path.join(JSONURL, json_file_name)}`, async (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return next();
        }

        var sdata = await BSC.data_save({ user_id: user_id, audio_name: filename, json_name: json_file_name, origin_name: originalname, color: JSON.parse(color), style: JSON.parse(style), text: JSON.parse(text) }, AudioModel)
        if (sdata) {
            this.getAudiosByUserId(req, res, next);
        } else {
            return res.json({
                status: false,
                data: BSC.TEXT_SERVER_ERROR
            })
        }
    });

}

exports.uploadRecording = async (req, res, next) => {
    const { originalname } = req.files[0];
    const file_name = md5(String(new Date().valueOf())) + "." + req.files[0].mimetype.split("/")[1]
    const json_file_name = md5(String(new Date().valueOf())) + ".json"
    fs.writeFile(`${path.join(MUSICURL, file_name)}`, req.files[0].buffer, (err) => {
        if (err) {
            return res.json({
                status: false,
                data: BSC.TEXT_FAILED_CREATING_RECORD
            })
        } else {
            exec(`audiowaveform -i ${path.join(MUSICURL, file_name)} -o ${path.join(JSONURL, json_file_name)}`, async (err, stdout, stderr) => {
                if (err) {
                    console.error(err);
                    return next();
                }

                var sdata = await BSC.data_save({ user_id: String(Date.now()), audio_name: file_name, json_name: json_file_name, origin_name: originalname }, AudioModel)
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
    })
}

exports.getAudiosByUserId = async (req, res) => {
    const { user_id } = req.body;
    var data = await BSC.Bfind(AudioModel, { user_id });
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

exports.getJson = async (req, res) => {
    fs.readFile(`${path.join(JSONURL, req.body.filename)}`, (err, data) => {
        if (err) {
            return res.json({
                status: false,
                data: BSC.TEXT_FILE_NOT_FOUND_ERROR
            })
        } else {
            let json_data = JSON.parse(data);
            return res.json({
                status: true,
                data: json_data
            })
        }
    });
}

exports.getDefaultAudio = async (req, res) => {
    var data = await BSC.Bfind(AudioModel, { user_id: "default_music" });
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

exports.updateAudioStyles = async (req, res) => {
    const { user_id, audio_id, update_data } = req.body
    var data = await BSC.BfindOneAndUpdate(AudioModel, { user_id, _id: audio_id }, update_data);

    if (data) {
        this.getAudioStyle(req, res)
    } else {
        return res.json({
            status: false,
            data: BSC.TEXT_SERVER_ERROR
        })
    }
}

exports.getAudioStyle = async (req, res) => {
    const { user_id, audio_id } = req.body;
    var data = await BSC.BfindOne(AudioModel, { user_id, _id: audio_id })

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