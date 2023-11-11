const mongoose = require("mongoose");

const codeSchema = mongoose.Schema({
    code: String,
    relatedEmail: String
})

module.exports = mongoose.model("EmailVerifierCode", codeSchema)