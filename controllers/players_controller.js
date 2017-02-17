const path = require('path');
const {Player} = require(path.resolve('models','player_model'));
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const PlayersController = {
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
      console.log(playerObj.sportsList);
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
    PlayersController
  }
