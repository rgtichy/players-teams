
// TeamController

leagueApp.controller('TeamController', ['$route','$scope', 'MainFactory', '$routeParams', function($route,$scope, MainFactory, $routeParams){
  console.log('TeamController loaded');

  $scope.team = {};
  $scope.newTeam = {};
  $scope.editTeam = {};
  $scope.teams = [];
  $scope.leagues = [];

  $scope.sports=MainFactory.sports;
  MainFactory.sportsIndex();

  $scope.leagues=MainFactory.leagues;
  MainFactory.leaguesIndex();

  $scope.delete = function(){
    MainFactory.delete( 'teams', $scope.editTeam._id, function(response){
      $route.reload();
    } );
  }
  $scope.add = function(){
    MainFactory.insert( 'teams', $scope.newTeam , function(response){
      $route.reload();
    } );
  }
  $scope.update = function(){
    MainFactory.update('teams', $scope.editTeam , function(response){
      console.log(response)
      if(response.data.success===true){
        $scope.team.teamName=editTeam.teamName;
        $scope.team.location=editTeam.location;
        $scope.team.sport=editTeam.sport;
        $scope.team.gender=editTeam.gender;
        $scope.editTeam={};
      }
    });
  }
  $scope.teamsIndex = function(){
    MainFactory.get('teams',function(response){
      $scope.teams=response.data;
    })
  }
  $scope.teamsIndex();
  $scope.getTeam = function(){
    MainFactory.getOne('teams',$routeParams.id, function(response){
      $scope.team = angular.copy(response.data);
      $scope.editTeam = angular.copy(response.data);
    });
    MainFactory.find(`/team-roster/${$routeParams.id}`,{team:{_id:$routeParams.id}}, function(response){
      $scope.roster = angular.copy(response.data);
    });
    MainFactory.get('/available',function(response){
      $scope.available = angular.copy(response.data);
      for (each in $scope.available){
        $scope.available[each].sportsList = function(){
          var list=[];
          for (one in $scope.available[each].sports){
            list.push($scope.available[each].sports[one].sport)
          }
          return list.join(", ")
        }()
      }
    });
  }
  if ($routeParams.id !== undefined){
    $scope.getTeam()
  }
  $scope.addStint = function(_id){
    console.log($scope.available,"player" ,_id, "team",$routeParams.id)
    // MainFactory.insert('stints',{team: team._id , player: playerId}, function(response){
    //   var playerObj = angular.copy(response.data);
    //   $scope.roster.push(playerObj);
    //   var idx = $scope.available.indexOf(playerObj);
    //   $scope.available.slice(idx,1);
    // })
  }
}]);

  // SportController

  leagueApp.controller('SportController', ['$route','$scope', 'MainFactory', '$routeParams', function($route,$scope, MainFactory, $routeParams){
    console.log('SportController loaded');

    $scope.sport = {};
    $scope.newSport = {};
    $scope.sports=[];
    $scope.editSport = {};

    $scope.sports=MainFactory.sports;
    MainFactory.sportsIndex();

    $scope.add = function(){
      console.log($scope.newSport)
      MainFactory.insert('sports',$scope.newSport,function(response){
        $route.reload()
      })
    }

    $scope.delete = function(){
      MainFactory.delete( 'sports', $scope.editSport._id ,console.log);
    }

    $scope.update = function(){
      MainFactory.update('sports',$scope.editSport,function(response){
        $scope.sport=angular.copy(response.data)
      })
    }

    $scope.getSport = function(){
      MainFactory.getOne('sports',$routeParams.id, function(response){
        // To get a single user from the names array of objects in the
        // MainFactory, I have to get the value of the index key...
        $scope.sport = angular.copy(response.data);
        $scope.editSport = angular.copy(response.data);
      });
    }
    if ($routeParams.id !== undefined){
      $scope.getSport()
    }
  }]);

// LeagueController

leagueApp.controller('LeagueController', ['$route','$scope', 'MainFactory', '$routeParams', function($route,$scope, MainFactory, $routeParams){
  console.log('LeagueController loaded');

  $scope.league = {};
  $scope.newLeague = {};
  $scope.leagues = [];
  $scope.editLeague = {};
  $scope.sports = [];

  console.log("getting leagues.")
  $scope.leagues = MainFactory.leagues;
  MainFactory.leaguesIndex();

  console.log("getting sports.")
  $scope.sports=MainFactory.sports;
  MainFactory.sportsIndex();
  console.log($scope.sports);

  $scope.add = function(){
    console.log($scope.newLeague)
    MainFactory.insert('leagues',$scope.newLeague,function(response){
      $route.reload()
    })
  }

  $scope.delete = function(){
    MainFactory.delete( 'leagues', $scope.editLeague._id ,console.log);
  }

  $scope.update = function(){
    MainFactory.update('leagues',$scope.editLeague,function(response){
      $scope.league=angular.copy(response.data)
    })
  }

  $scope.getLeague = function(){
    MainFactory.getOne('leagues',$routeParams.id, function(response){
      $scope.league = angular.copy(response.data);
      $scope.editLeague = angular.copy(response.data);
    });
    MainFactory.find( `/league-teams/${$routeParams.id}`, function(response){
      $scope.leagueTeams = angular.copy(response.data)
      console.log($scope.leagueTeams)
    })
  }
  if ($routeParams.id !== undefined){
    $scope.getLeague()
  }
}]);

// PlayerController

leagueApp.controller('PlayerController', ['$location','$route','$scope', 'MainFactory', '$routeParams', function($location,$route,$scope, MainFactory, $routeParams){
  console.log('PlayerController loaded');

  $scope.player = {};
  $scope.newPlayer = {};
  $scope.players = [];
  $scope.editPlayer = {};

  $scope.sports = [];
  $scope.sports=MainFactory.sports;
  MainFactory.sportsIndex();

  if ($routeParams.id !== undefined){
    $scope.player = MainFactory.player;
    $scope.editPlayer = MainFactory.player;
    MainFactory.getPlayer($routeParams.id);
  }

  $scope.add = function(){
    console.log($scope.newPlayer)
    MainFactory.insert('players',$scope.newPlayer,function(response){
      $route.reload();
    })
  }

  $scope.playersIndex = function(){
    MainFactory.get( 'players' ,function(response){
      $scope.players = response.data
      for (each in $scope.players){
        $scope.players[each].sportsList = function(){
          var list=[];
          for (one in $scope.players[each].sports){
            list.push($scope.players[each].sports[one].sport)
          }
          return list.join(", ")
        }()
      }
      console.log("Afterwards",$scope.players)
    });
  }
  $scope.playersIndex();

  $scope.delete = function(){
    MainFactory.delete( 'players', $scope.editPlayer._id ,console.log);
  }

  $scope.update = function(){
    MainFactory.update('players',$scope.editPlayer,function(response){
      $scope.player=angular.copy(response.data);
      $location.path('#!/players')
    })
  }
}]);
