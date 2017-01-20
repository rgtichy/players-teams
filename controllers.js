const { Player, Team, Sport } = require('./models');

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

}
const TeamsController={
  index: function(req,res){
    Team.find({}).sort({teamName: 1})
    .then(function(teams){
        res.json(teams);
    })
    .catch(function(err){
        res.status(500).json(err);
    });
  },
  create: function(req,res){
    Team.create(req.body)
    .populate('sport')
    .then(function(newTeam){
      Team.find({}).sort({teamName: 1})
      .then(function(teams){
        res.json(teams);
      });
    })
    .catch(function(error){
      res.status(500);
      res.json(error);
    });
  },
  update: function(req,res){
    Team.findByIdAndUpdate(req.params.id,updObj,{runValidators: true, new: true})
    .then(function(dataObj){
      res.json(dataObj)
    })
    .catch(TeamsController.error)
  },
  error: function(error){
    res.status(500);
    res.json(error);
  }
}
module.exports = {
    PlayersController,
    TeamsController,
    SportsController
}
