const path = require('path');
const {PlayersController} = require(path.resolve('controllers','players_controller'));
const {TeamsController} = require(path.resolve('controllers','teams_controller'));

module.exports = function(app){
  app.get("/team-roster/:team_id",PlayersController.teamRoster);
  app.get("/available",PlayersController.available);
  app.get("/league-teams/:league_id",TeamsController.leagueTeams);
}
