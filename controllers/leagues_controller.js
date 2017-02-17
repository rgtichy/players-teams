const path = require('path');
const {League} = require(path.resolve('models','league_model'));
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const LeaguesController = {
  index: function(req,res){
    League.find({}).sort({name: 1})
    .populate('sport')
    .exec()
    .then(function(leagues){
        res.json(leagues);
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  show: function(req,res){
    League.findById(req.params.id)
    .populate('sport')
    .exec()
    .then(function(leagueObj){
      res.json(leagueObj);
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
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
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
  delete: function(req,res){
    League.findByIdAndRemove(req.params.id)
    .then(function(resObj){
      res.json({success:true})
    })
    .catch(function(err){
      res.status(500);
      res.json(err);
    });
  },
}
module.exports = {
    LeaguesController,
}
