var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/league");
mongoose.connection.on('connected', function(){
    console.log("database connected");
});


var playerSchema = mongoose.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    birthDate: Date,
    gender: { type: String,
              trim: true},
    sports: [{type:mongoose.Schema.Types.ObjectId, ref: 'Sport'}],
    history: [{type:mongoose.Schema.Types.ObjectId, ref: 'Team'}],
    currentTeam: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', index:true },
});
    playerSchema.virtual('sportsList')
    .get(function(){
      return sports.join(", ")
    });

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

var sportSchema = mongoose.Schema({
    sport: { type: String,
             trim: true,
             lowercase: true,
             required: true,
             index: true,
             unique: true},
});
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
