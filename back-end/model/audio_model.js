const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const audios = () => {
    var AudioSchema = new Schema({
        user_id: { type: String, required: true },
        origin_name: { type: String, required: true },
        audio_name: { type: String, required: true },
        json_name: { type: String, required: true },
        style: { type: Object, required: true },
        text: { type: Object, required: true },
        date: { type: Date, default: Date.now() }
    })

    return mongoose.model("audios", AudioSchema);
}

module.exports = {
    audios: audios()
}