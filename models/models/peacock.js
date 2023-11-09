const mongoose = require("mongoose")
const costumeSchema = mongoose.Schema({
peacock_color: String,
peacock_breed: String,
peacock_price: Number
})
module.exports = mongoose.model("Costume",
costumeSchema)