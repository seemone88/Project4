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
  var search = self.input
  var allMoviesUrl = 'http://api.themoviedb.org/3/search/movie?api_key=a3de5c1057ac7354650707d0e6d7df17&query=' + search;
  var movieFactory = {};
  movieFactory.getAllMovies = function(movies){
    return $http.get(allMoviesUrl)
    console.log($http.get(allMoviesUrl));
  };
  return movieFactory;
  };
// remember the order of your arguments matter
function MyController($MyFactory){
  // keep track of your scope by asigning this to a variable
  var self = this;
  self.api = $MyFactory;
  self.movies = [];
  self.oneMovie = null;
  self.displayMovies = displayMovies;

  self.api.getAllMovies()
  .success(function(data){
    self.movies = data.movies;
    console.log(self.movies);
  })

  function displayMovies(){
    console.log(this.input)
  }

  self.showMovies = function(movies){

    self.api.getMovies(movies)
    .success(function(data){
      self.oneMovie = data;
    })






  // initialize your controller variables

  // use the factory function to return the data from the api

  // create a function that returns data for the selected pokemon
  };
};




})();
