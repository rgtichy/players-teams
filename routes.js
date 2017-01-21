var { PlayersController, TeamsController, SportsController  } = require('./controllers');

module.exports = function(app){
    app.get("/teams", TeamsController.index);
    app.post("/teams", TeamsController.create);
    app.get("/teams/:id", TeamsController.show);
    app.put("/teams", TeamsController.update);

    app.get("/sports", SportsController.index);
    app.put("/sports", SportsController.update);
    app.post("/sports", SportsController.create);
    app.delete("/sports/:id", SportsController.delete);
    app.get("/sports/:id", SportsController.show);
}
