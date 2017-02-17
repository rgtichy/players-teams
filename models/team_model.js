var mongoose = require("mongoose");

var teamSchema = mongoose.Schema({
    teamName: { type: String,
                trim: true,
                lowercase: true,
                required: true,
                index: true },
    location: { type: String },
    league: {type:mongoose.Schema.Types.ObjectId, ref: 'League', index: true},
    roster: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
});

var Team = mongoose.model("Team", teamSchema);

module.exports = {
    Team
}
