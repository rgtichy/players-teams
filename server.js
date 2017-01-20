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
app.use(bp.urlencoded({extended:true}));
app.use(bp.json());
app.use(express.static(path.join(__dirname, 'client')));
app.use('/js', express.static(path.join(__dirname, 'bower_components')));

var routes = require('./routes');
routes(app);

app.listen(8000);
