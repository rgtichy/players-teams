var mongoose = require("mongoose");

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
playerSchema.virtual('sportsList').get(function(){
  // console.log(this.sports);
  return this.sports.map(element=> element.sport).join(", ");
});

var Player = mongoose.model("Player", playerSchema);

module.exports = {
    Player,
}
