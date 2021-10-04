const AudioModel = require("./audio_model").audios
const BSC = require("../controller/basecontroller")

const seedAudio = async () => {
    const audios = await BSC.Bfind(AudioModel, {})
    if (audios.length == 0) {
        const color = {
            "color": 0,
            "backgroundColor": "#FFFFFF"
        }
        const style = {
            "graph_type": "bar",
            "bar_width": 2,
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
        
        BSC.data_save({ user_id: "default_music", audio_name: "25ce7c0fa50a3fb523c9b3c8a24f95cf.mp3", json_name: "79149c4d64bf024ef0ff543c12a46edb.json", origin_name: "Demo Sound File", color, style, text }, AudioModel)
    }
}

module.exports = {
    seedAudio
}