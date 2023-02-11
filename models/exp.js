const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExpSchema = new Schema({
    _id: Number,
    donde: String,
    logo: String,
    cuando: String,
    haciendoQue: String
});

module.exports = mongoose.model("Exp", ExpSchema);
