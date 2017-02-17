const path = require('path');
const {Sport} = require(path.resolve('models','sport_model'));
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const SportsController = {
  index: function(req,res){
    Sport.find({}).sort({sport: 1})
      .then(function(sports){
        res.json(sports);
      })
      .catch(function(err){
        res.status(500);
        res.json(err);
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
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  update: function(req,res){
    Sport.findByIdAndUpdate(req.body._id, req.body, {runValidators: true, new:true})
    .then(function(sportObj){
      res.json(sportObj)
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  delete: function(req,res){
    Sport.findByIdAndRemove(req.params.id)
    .then(function(sportObj){
      res.json({success:true})
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
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
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  show: function(req,res){
    Player.findById(req.params.id)
    .populate('sports')
    .exec()
    .then(function(playerObj){
      var tmp = playerObj.sportsList;
      playerObj = playerObj.toObject();
      playerObj.sportsList = tmp;
      res.json(playerObj);
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  create: function(req,res){
    Player.create(req.body)
    .then(function(newPlayer){
      res.json(newPlayer);
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  update: function(req,res){
    Player.findByIdAndUpdate(req.body._id, req.body, {runValidators: true, new:true})
    .then(function(dataObj){
      res.json(dataObj)
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  delete: function(req,res){
    Player.findByIdAndRemove(req.params.id)
    .then(function(playerObj){
      res.json({success:true})
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  teamRoster: function(req,res){
    Player.find({currentTeam:  req.params.team_id })
    .populate('sports')
    .populate('currentTeam')
    .exec()
    .then(function(rosterObj){
      res.json(rosterObj)
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  available: function(req,res){
    Player.find({$or: [{ currentTeam : { $exists : false }}] })
    .populate('sports')
    .exec()
    .then(function(available){
      res.json(available)
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    })
  },
  rosterAdd: function(req,res){
    // 1st remove player from any other teamName
    // 1.5th write a change record with timestamps for player history
    // 2nd add player onto the current team
    Player.findByIdAndUpdate(req.body._id, req.body, {runValidators: true, new:true})
    .then(function(dataObj){
      res.json(dataObj)
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
}
module.exports = {
    SportsController,
}
