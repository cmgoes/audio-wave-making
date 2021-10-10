const BSC = require('./basecontroller');
const AudioModel = require('../model/audio_model').audios
const { exec } = require('child_process');
const Buffer = require('buffer/').Buffer
const path = require('path');
const md5 = require('md5')
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

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
    const { user_id } = req.body;
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
            const me = this;
            const new_file_name = file_name.split(".")[0] + ".mp3"
            BSC.convert(path.join(MUSICURL, file_name), path.join(MUSICURL, new_file_name), function(err){
                if(!err) {
                    exec(`audiowaveform -i ${path.join(MUSICURL, new_file_name)} -o ${path.join(JSONURL, json_file_name)}`, async (err, stdout, stderr) => {
                        if (err) {
                            console.error(err);
                            return next();
                        }
        
                        const color = {
                            "color": 0,
                            "backgroundColor": "#FFFFFF"
                        }
                        const style = {
                            "graph_type": "bar",
                            "bar_width": 20,
                            "bar_space": 0,
                            "circle_radius": 0,
                            "circle_rotate": 0,
                            "bar_shape": 0
                        }
                        const text = {
                            "displayText": "",
                            "textFont": "Alfa Slab One",
                            "textColor": "black",
                            "fontSize": 72,
                            "textJustification": 1,
                            "textVerticalAlign": 1
                        }
        
                        var sdata = await BSC.data_save({ user_id: user_id, audio_name: new_file_name, json_name: json_file_name, origin_name: originalname, color, style, text }, AudioModel)
                        if (sdata) {
                            me.getAudiosByUserId(req, res, next);
                        } else {
                            return res.json({
                                status: false,
                                data: BSC.TEXT_SERVER_ERROR
                            })
                        }
                    });
                    fs.unlink(path.join(MUSICURL, file_name), (err) => {
                        if (err) throw err;
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

/**
 *    input - string, path of input file
 *    output - string, path of output file
 *    callback - function, node-style callback fn (error, result)        
 */
// function convert(input, output, callback) {
//     ffmpeg(input)
//         .output(output)
//         .on('end', function() {                    
//             console.log('conversion ended');
//             callback(null);
//         }).on('error', function(err){
//             console.log('error: ', err);
//             callback(err);
//         }).run();
// }

// function run() {
    // convert(path.join(MUSICURL, 'recording.webm'), path.join(MUSICURL, 'recording.mp3'), function(err){
    //    if(!err) {
    //        console.log('conversion complete');
    //        //...
    //    }
    // });
// }
