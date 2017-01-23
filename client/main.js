var leagueApp = angular.module("leagueApp", ["ngRoute"]);

leagueApp.config(["$routeProvider", function($routeProvider){
  $routeProvider
  .when("/main", {
      controller: "SportController",
      templateUrl: "partials/_sports.html"
  })
  .when('/players', {
    controller: "PlayerController",
    templateUrl: "partials/_players.html"
  })
  .when('/players/:id', {
    controller: "PlayerController",
    templateUrl: "partials/_showPlayer.html"
  })
  .when('/players/:id/edit', {
    controller: "PlayerController",
    templateUrl: "partials/_editPlayer.html"
  })
  .when('/teams', {
    controller: "TeamController",
    templateUrl: "partials/_teams.html"
  })
  .when('/teams/:id', {
    controller: "TeamController",
    templateUrl: "partials/_showTeam.html"
  })
  .when('/teams/:id/edit', {
    controller: "TeamController",
    templateUrl: "partials/_editTeam.html"
  })
  .when('/sports', {
    controller: "SportController",
    templateUrl: "partials/_sports.html"
  })
  .when('/sports/:id', {
    controller: "SportController",
    templateUrl: "partials/_showSport.html"
  })
  .when('/sports/:id/edit', {
    controller: "SportController",
    templateUrl: "partials/_editSport.html"
  })
  .when('/leagues', {
    controller: "LeagueController",
    templateUrl: "partials/_leagues.html"
  })
  .when('/leagues/:id', {
    controller: "LeagueController",
    templateUrl: "partials/_showLeague.html"
  })
  .when('/leagues/:id/edit', {
    controller: "LeagueController",
    templateUrl: "partials/_editLeague.html"
  })
  .otherwise({
    redirectTo: '/main'
  })
}]);

// MainFactory

leagueApp.factory("MainFactory", ['$http',function($http){
  console.log('MainFactory loaded');
  var factory = {};
  factory.get = function($$url,callback){
    $http({
      url: $$url,
      method: 'GET',
    })
    .then( callback )
    .catch( function(error){
      console.log(error)
    } );
  };
  factory.getOne = function($$url,id,callback){
    console.log(`/${$$url}/${id}`)
    $http({
      url: `/${$$url}/${id}`,
      method: 'GET',
    })
    .then(callback)
    .catch( function(error){
      console.log(error)
    } );
  };
  factory.delete = function($$url,id,callback){
    console.log($$url,id)
    $http.delete(`/${$$url}/${id}`)
    .then(callback)
    .catch(console.log);
  };
  factory.insert = function($$url,newObj,callback){
    $http.post(`/${$$url}`,newObj)
    .then(callback)
    .catch( function(error){
      console.log(error)
    } );
  };
  factory.update = function($$url,editObj,callback){
    $http.put(`/${$$url}`,editObj)
    .then(callback)
    .catch( function(error){
      console.log(error)
    } );
  };
  factory.find = function($$url,callback){
    $http.get($$url)
    .then(callback)
    .catch(console.log);
  };
  factory.sportsIndex = function(callback){
    $http({
      url: "/sports",
      method: 'GET',
    })
    .then( callback )
    .catch(console.log);
  }
  factory.leaguesIndex = function(callback){
    console.log("retrieving leagues array")
    $http({
      url: "/leagues",
      method: 'GET',
    })
    .then( callback )
    .catch(console.log);
  }
  return factory;
}]);

// TeamController

leagueApp.controller('TeamController', ['$route','$scope', 'MainFactory', '$routeParams', function($route,$scope, MainFactory, $routeParams){
  console.log('TeamController loaded');

  $scope.team = {};
  $scope.newTeam = {};
  $scope.editTeam = {};
  $scope.teams = [];
  $scope.leagues = [];

  MainFactory.sportsIndex(function(response){
    $scope.sports=response.data;
  });

  MainFactory.leaguesIndex(function(response){
    $scope.leagues=response.data;
  });

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
  }
  if ($routeParams.id !== undefined){
    $scope.getTeam()
  }
}]);

  // SportController

  leagueApp.controller('SportController', ['$route','$scope', 'MainFactory', '$routeParams', function($route,$scope, MainFactory, $routeParams){
    console.log('SportController loaded');

    $scope.sport = {};
    $scope.newSport = {};
    $scope.sports=[];
    $scope.editSport = {};

    $scope.sportsIndex = function(){
      MainFactory.get('sports',function(response){
        $scope.sports=response.data;
      })
    }
    $scope.sportsIndex();

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

  console.log("getting leagues?")
  MainFactory.leaguesIndex(function(response){
    $scope.leagues=response.data;
  });
  console.log("getting sports?")
  MainFactory.sportsIndex(function(response){
    $scope.sports=response.data;
  });
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

leagueApp.controller('PlayerController', ['$route','$scope', 'MainFactory', '$routeParams', function($route,$scope, MainFactory, $routeParams){
  console.log('PlayerController loaded');

  $scope.player = {};
  $scope.newPlayer = {};
  $scope.players = [];
  $scope.editPlayer = {};
  $scope.sports = [];

  console.log("getting sports?")
  MainFactory.sportsIndex(function(response){
    $scope.sports=response.data;
  });
  $scope.add = function(){
    console.log($scope.newPlayer)
    MainFactory.insert('players',$scope.newPlayer,function(response){
      $route.reload();
    })
  }

  $scope.delete = function(){
    MainFactory.delete( 'players', $scope.editPlayer._id ,console.log);
  }

  $scope.update = function(){
    MainFactory.update('players',$scope.editPlayer,function(response){
      $scope.player=angular.copy(response.data);
      $route.reload();
    })
  }

  $scope.getPlayer = function(){
    MainFactory.getOne('players',$routeParams.id, function(response){
      $scope.player = angular.copy(response.data);
      $scope.editPlayer = angular.copy(response.data);
    });
  }
  if ($routeParams.id !== undefined){
    $scope.getPlayer()
  }
}]);
