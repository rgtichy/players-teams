const { Player, Team, Sport, League } = require('./models');

function error(error){
  res.status(500);
  res.json(error);
}

const SportsController={
  index: function(req,res){
    Sport.find({}).sort({sport: 1})
      .then(function(sports){
        res.json(sports);
      })
      .catch(function(err){
        res.status(500).json(err);
    });
  },
  create: function(req,res){
    Sport.create(req.body)
    .then(function(newSport){
      return Sport.find({}).sort({sport: 1})
      .then(function(sports){
        res.json(sports);
      })
    })
    .catch(function(error){
      res.status(500);
      res.json(error);
    });
  },
  show: function(req,res){
    Sport.findById(req.params.id)
    .then(function(sportObj){
      res.json(sportObj);
    })
    .catch(error)
  },
  update: function(req,res){
    Sport.findByIdAndUpdate(req.body._id, req.body, {runValidators: true, new:true})
    .then(function(sportObj){
      res.json(sportObj)
    })
    .catch(error)
  },
  delete: function(req,res){
    Sport.findByIdAndRemove(req.params.id)
    .then(function(sportObj){
      res.json({success:true})
    })
    .catch(error)
  },
  error: function(error){
    res.status(500);
    res.json(error);
  }
}
const PlayersController={
  index: function(req,res){
    Player.find({}).sort({lastName: 1})
    .populate('sports')
    .exec()
    .then(function(players){
        res.json(players);
    })
    .catch(error);
  },
  show: function(req,res){
    Player.findById(req.params.id)
    .populate('sports')
    .exec()
    .then(function(playerObj){
      res.json(playerObj);
    })
    .catch(error)
  },
  create: function(req,res){
    Player.create(req.body)
    .then(function(newPlayer){
      res.json(newPlayer);
    })
    .catch(error)
  },
  update: function(req,res){
    Player.findByIdAndUpdate(req.body._id, req.body, {runValidators: true, new:true})
    .then(function(dataObj){
      res.json(dataObj)
    })
    .catch(function(err){
      console.log(err)
    });
  },
  delete: function(req,res){
    Player.findByIdAndRemove(req.params.id)
    .then(function(playerObj){
      res.json({success:true})
    })
    .catch(error)
  },
  teamRoster: function(req,res){
    Player.find(req.body)
    .populate('sport')
    .exec()
    .then(function(rosterObj){
      res.json(rosterObj)
    })
    .catch(error)
  }
}
const TeamsController={
  index: function(req,res){
    Team.find({}).sort({teamName: 1})
    .populate('roster')
    .populate('league')
    .populate('sport')
    .exec()
    .then(function(teams){
        res.json(teams);
    })
    .catch(function(err){
        res.status(500).json(err);
    });
  },
  show: function(req,res){
    Team.findById(req.params.id)
    .then(function(teamObj){
      res.json(teamObj);
    })
    .catch(error)
  },
  create: function(req,res){
    Team.create(req.body)
    .then(function(newTeam){
      res.json(newTeam);
    })
    .catch(function(error){
      res.status(500);
      res.json(error);
    });
  },
  update: function(req,res){
    Team.findByIdAndUpdate(req.body._id, req.body, {runValidators: true, new:true})
    .then(function(dataObj){
      res.json(dataObj)
    })
    .catch(TeamsController.error)
  },
  delete: function(req,res){
    Team.findByIdAndRemove(req.params.id)
    .then(function(teamObj){
      res.json({success:true})
    })
    .catch(error)
  },
  leagueTeams: function(req,res){
    Team.find({league: {_id: req.params.league_id}})
    .populate('team')
    .exec()
    .then(function(teams){
        res.json(teams);
    })
    .catch(error);
  },
}
const LeaguesController={
  index: function(req,res){
    League.find({}).sort({name: 1})
    .populate('sport')
    .exec()
    .then(function(leagues){
        res.json(leagues);
    })
    .catch(function(err){
        res.status(500).json(err);
    });
  },
  show: function(req,res){
    League.findById(req.params.id)
    .then(function(leagueObj){
      res.json(leagueObj);
    })
    .catch(error)
  },
  create: function(req,res){
    League.create(req.body)
    .then(function(newLeague){
      res.json(newLeague);
    })
    .catch(function(error){
      res.status(500);
      res.json(error);
    });
  },
  update: function(req,res){
    League.findByIdAndUpdate(req.body._id, req.body, {runValidators: true, new:true})
    .then(function(dataObj){
      res.json(dataObj)
    })
    .catch(LeaguesController.error)
  },
  delete: function(req,res){
    League.findByIdAndRemove(req.params.id)
    .then(function(resObj){
      res.json({success:true})
    })
    .catch(error)
  },
  error: function(error){
    res.status(500);
    res.json(error);
  }
}
module.exports = {
    PlayersController,
    TeamsController,
    SportsController,
    LeaguesController
}
