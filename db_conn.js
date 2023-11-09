const mongoose = require("mongoose");

module.exports = async function db_conn() {
    mongoose.connect("mongodb://127.0.0.1:27017/dreamkeeper")
};
