var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/league");
mongoose.connection.on('connected', function(){
    console.log("database connected");
});


var playerSchema = mongoose.Schema({
    lastName: { type: String, require: true },
    firstName: { type: String, require: true },
    birthDate: Date,
    gender: { type: String,
              trim: true},
    sports: [{type:mongoose.Schema.Types.ObjectId, ref: 'Sport'}],
    history: [{type:mongoose.Schema.Types.ObjectId, ref: 'Team'}],
    currentTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' }
});

var teamSchema = mongoose.Schema({
    teamName: { type: String,
                trim: true,
                lowercase: true,
                require: true,
                index: true },
    location: { type: String },
    league: {type:mongoose.Schema.Types.ObjectId, ref: 'League', index: true},
    roster: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }]
});

var sportSchema = mongoose.Schema({
    sport: { type: String,
             trim: true,
             lowercase: true,
             require: true,
             index: true,
             unique: true},
});
var leagueSchema = mongoose.Schema({
    name: { type: String,
             trim: true,
             lowercase: true,
             require: true,
             index: true,},
    abbr: { type: String,
            uppercase: true,
            trim: true},
    sport:  {type:mongoose.Schema.Types.ObjectId, ref: 'Sport', require:true},
    gender: { type: String, require: true },
});
var Player = mongoose.model("Player", playerSchema);
var Team = mongoose.model("Team", teamSchema);
var Sport = mongoose.model("Sport", sportSchema);
var League = mongoose.model("League", leagueSchema);

module.exports = {
    Player,
    Team,
    Sport,
    League
}
