const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colors = () => {
    var ColorSchema = new Schema({
        user_id: { type: String, required: true },
        name: { type: String, required: true },
        color: { type: Array, required: true }
    })

    return mongoose.model("colors", ColorSchema);
}

module.exports = {
    colors: colors()
}