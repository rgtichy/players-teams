var leagueApp = angular.module("leagueApp", ["ngRoute"]);

leagueApp.config(["$routeProvider", function($routeProvider){
  $routeProvider
  .when("/main", {
      controller: "SportController",
      templateUrl: "partials/_sports.html"
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
  factory.getSports = function(callback){
    $http({
      url: "/sports",
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

  if($scope.sports === [] || $scope.sports === undefined){
    MainFactory.getSports(function(response){
      $scope.sports=response.data;
    });
  }

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
  $scope.getTeams = function(){
    MainFactory.get('teams',function(response){
      $scope.teams=response.data;
    })
  }
  $scope.getTeams();

}]);

  // SportController

  leagueApp.controller('SportController', ['$route','$scope', 'MainFactory', '$routeParams', function($route,$scope, MainFactory, $routeParams){
    console.log('SportController loaded');

    $scope.sport = {};
    $scope.newSport = {};
    $scope.sports=[];
    $scope.editSport = {};

    $scope.getSports = function(){
      MainFactory.get('sports',function(response){
        $scope.sports=response.data;
      })
    }
    $scope.getSports();

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
