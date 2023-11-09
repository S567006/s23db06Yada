const mongoose = require("mongoose")
const peacock = mongoose.Schema({
costume_type: String,
size: String,
cost: Number
})
module.exports = mongoose.model("Costume",
peacock)