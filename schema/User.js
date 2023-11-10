const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dream_capability: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Users", userSchema)