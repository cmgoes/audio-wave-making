const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const users = () => {
    var UserSchema = new Schema({
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
    })

    UserSchema.pre("save", (next) => {
        next();
    })

    UserSchema.methods.generateHash = function (password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    }

    return mongoose.model("users", UserSchema);
}

module.exports = {
    users: users()
}