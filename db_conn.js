const mongoose = require("mongoose");

module.exports = async function db_conn() {
    mongoose.connect(process.env.MONGO_CONN)
};
