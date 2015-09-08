(function(){
  //Declare your angular app
  angular.module('moviesApp',[])
  .controller('MyController', MyController);
  //create a factory to handle a single model; create before controller


function MyController(){
  console.log("hello");
}


})();
