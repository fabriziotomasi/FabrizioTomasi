const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpSchema = new Schema({
    donde: String,
    cuando: String,
    haciendoQue: String
});

module.exports = mongoose.model("Exp", ExpSchema);
