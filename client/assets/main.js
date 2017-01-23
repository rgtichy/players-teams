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
  .when('/addPlayer', {
    controller: "PlayerController",
    templateUrl: "partials/_addPlayer.html"
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
