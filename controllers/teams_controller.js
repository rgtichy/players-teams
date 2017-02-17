const path = require('path');
const {Team} = require(path.resolve('models','team_model'));
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const TeamsController = {
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
      res.status(500);
      res.json(err);
    });
  },
  show: function(req,res){
    Team.findById(req.params.id)
    .populate('roster')
    .populate('sport')
    .populate('league')
    .exec()
    .then(function(teamObj){
      res.json(teamObj);
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
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
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  delete: function(req,res){
    Team.findByIdAndRemove(req.params.id)
    .then(function(teamObj){
      res.json({success:true})
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  leagueTeams: function(req,res){
    Team.find({league: {_id: req.params.league_id}})
    .populate('team')
    .exec()
    .then(function(teams){
        res.json(teams);
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
}

module.exports = {
    TeamsController
  }
