const mongoose = require("mongoose")

const dreamSchema = mongoose.Schema({
    author: {type: String, required: true},
    dream_record: {type: String, required: true},
    islucid: {type: String, required: true},
    date: {type: String, required: true}
})

module.exports = mongoose.model("Dream", dreamSchema)