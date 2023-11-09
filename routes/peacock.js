const mongoose = require("mongoose")
const peacock = mongoose.Schema({
peacock_color: String,
peacock_breed: String,
peacock_price: Number
})
module.exports = mongoose.model("Costume",
peacock)