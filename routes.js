var { PlayersController, TeamsController, SportsController, LeaguesController  } = require('./controllers');

module.exports = function(app){
    app.get("/teams", TeamsController.index);
    app.post("/teams", TeamsController.create);
    app.get("/teams/:id", TeamsController.show);
    app.put("/teams", TeamsController.update);
    app.delete("/teams/:id", TeamsController.delete);

    app.get("/leagues", LeaguesController.index);
    app.post("/leagues", LeaguesController.create);
    app.get("/leagues/:id", LeaguesController.show);
    app.put("/leagues", LeaguesController.update);
    app.delete("/leagues/:id", LeaguesController.delete);

    app.get("/sports", SportsController.index);
    app.post("/sports", SportsController.create);
    app.get("/sports/:id", SportsController.show);
    app.put("/sports", SportsController.update);
    app.delete("/sports/:id", SportsController.delete);

    app.get("/players", PlayersController.index);
    app.post("/players", PlayersController.create);
    app.get("/players/:id", PlayersController.show);
    app.put("/players", PlayersController.update);

// special functions
    app.get("/team-roster/:team_id",PlayersController.teamRoster);
    app.post("/team-roster/:team_id",PlayersController.rosterAdd);
    app.get("/available",PlayersController.available);
    app.get("/league-teams/:league_id",TeamsController.leagueTeams);
}
