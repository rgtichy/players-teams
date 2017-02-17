(function(){
  console.log('~+~o~+~o~+~o~+~o~+~o~+~o~+~o~+~')
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d H:M:S');
  console.log(formatted)
})();

var express = require('express');
var path = require('path');
var app = express();
var bp = require('body-parser');

require(path.resolve('config'));

app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use('/js', express.static(path.join(__dirname, 'bower_components')));

const teamRoutes   = require( path.resolve('routes', 'team_routes'   ));
const leagueRoutes = require( path.resolve('routes', 'league_routes' ));
const sportRoutes  = require( path.resolve('routes', 'sport_routes'  ));
const playerRoutes = require( path.resolve('routes', 'player_routes' ));

app.use('/teams'  , teamRoutes   );
app.use('/leagues', leagueRoutes );
app.use('/sports' , sportRoutes  );
app.use('/players', playerRoutes );

var routes = require(path.resolve('routes'));
routes(app);

app.listen(8000);
