const mongoose = require("mongoose")
const costumeSchema = mongoose.Schema({
peacock_color: String,
peacock_breed: String,
peacock_price: {
    type: Number,
    min: 100,
    max: 10000
}
});
module.exports = mongoose.model("Costume",costumeSchema)