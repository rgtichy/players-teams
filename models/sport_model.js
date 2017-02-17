var mongoose = require("mongoose");

var sportSchema = mongoose.Schema({
    sport: { type: String,
             trim: true,
             lowercase: true,
             required: true,
             index: true,
             unique: true},
});

var Sport = mongoose.model("Sport", sportSchema);

module.exports = {
    Sport
}
