
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
