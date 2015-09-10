
(function(){
  //Declare your angular app
  angular.module('moviesApp',[])


      .controller('MyController', MyController);
  //create a factory to handle a single model; create before controller
  // dependency injections

  // inject your factory into your controller
      MyController.$inject = ['$http']
// create your factory and controller functions to get hoisted




function MyController($http){
  // keep track of your scope by asigning this to a variable
  var self = this;
  var search = self.input
  self.ifSearched = false;
  self.api = $http.get('http://api.themoviedb.org/3/search/movie?api_key=a3de5c1057ac7354650707d0e6d7df17&query=' + search);
  self.movies = [];
  self.oneMovie = null;
//
//
//
self.showMovies = function(movies){
  var url = ('http://api.themoviedb.org/3/search/movie?api_key=a3de5c1057ac7354650707d0e6d7df17&query=' + self.input);
  self.api = $http.get(url)
  .success(function(data){
    self.movies = data.movies;
    self.allMovie = data.results;
    console.log(data.results);

  })
  .error(function(err){
    console.log(err);
  })
}



}
})();
