var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/league");
mongoose.connection.on('connected', function(){
    console.log("database connected");
});
