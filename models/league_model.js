var mongoose = require("mongoose");

var leagueSchema = mongoose.Schema({
    name: { type: String,
             trim: true,
             lowercase: true,
             required: true,
             index: true,},
    abbr: { type: String,
            uppercase: true,
            trim: true},
    sport:  {type:mongoose.Schema.Types.ObjectId, ref: 'Sport', required:true},
    gender: { type: String, require: true },
});

var League = mongoose.model("League", leagueSchema);

module.exports = {
    League
}
