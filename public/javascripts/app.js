(function(){
  //Declare your angular app
  angular.module('moviesApp',[])
      .factory('$MyFactory', myFactory)

      .controller('MyController', MyController);
  //create a factory to handle a single model; create before controller
  // dependency injections
      myFactory.$inject = ['$http']
  // inject your factory into your controller
      MyController.$inject = ['$MyFactory']
// create your factory and controller functions to get hoisted



function myFactory($http){

  var allMoviesUrl = 'http://api.themoviedb.org/3/search/movie?api_key=a3de5c1057ac7354650707d0e6d7df17&query=' + search;
  var movieFactory = {};
  console.log(allMoviesUrl);
  movieFactory.getAllMovies = function(movies){
    return $http.get(allMoviesUrl)

  };
  return movieFactory;
  };
// remember the order of your arguments matter
function MyController($MyFactory){
  // keep track of your scope by asigning this to a variable
  var self = this;
  var search = self.input
  self.ifSearched = false;
  self.api = $MyFactory;
  self.movies = [];
  self.oneMovie = null;



  self.api.getAllMovies()
  .success(function(data){
    self.movies = data.movies;
    console.log(self.movies);
  })



  self.showMovies = function(movies){

    self.api.getAllMovies(movies)
    .success(function(data){
      self.oneMovie = data;

      console.log(data);
    })
    .error(function(err){
      console.log(err);
    })





  // initialize your controller variables

  // use the factory function to return the data from the api

  // create a function that returns data for the selected pokemon
  };
};




})();
