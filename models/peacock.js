const mongoose = require("mongoose")
const peacockSchema = mongoose.Schema({
peacock_color: String,
peacock_breed: String,
peacock_price: Number
})
module.exports = mongoose.model("peacock",peacockSchema)