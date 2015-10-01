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
  var self = this;
  var search = self.input;
  $http.get('http://localhost:3000/movies/'+self.input)
        .success(function(data){
          console.log(data);
        })
        .error(function(err){
          console.log(err);
        })

self.showMovies = function(movies){
  var url = ('http://localhost:3000/movies/'+self.input)
  self.api = $http.get(url)
  .success(function(data){
    self.allMovie = data;
    console.log(self.allMovie);

  })
}
}
}());

// function MyController($http){
//   // keep track of your scope by asigning this to a variable
//   var self = this;
//   var search = self.input
//   self.ifSearched = false;
//   self.api = $http.get('http://api.themoviedb.org/3/search/movie?api_key=a3de5c1057ac7354650707d0e6d7df17&query=' + search);
//   self.movies = [];
//   self.oneMovie = null;
// //
// //
// //
//   .error(function(err){
//     console.log(err);
//   })
// }





// var data ={};
// jQuery('#displayMovies').on('click', function(){
//   var search = jQuery(this).prev().val();
//
//   var iframe = document.createElement("iframe");
//   iframe.src = 'http://www.primewire.ag/index.php?search_keywords='+search+'&key=81bc0fcf39e0538c&search_section=1';
//   iframe.onload = function () {
//     jQuery(this).find('div.index_item.index_item_ie').each(function(i,element){
//       var a = jQuery(this).children();
//       var b = jQuery(this).children().children();
//       var url = a.attr('href');
//       var img = b.attr('src');
//       var title = b.attr('alt');
//       data = {
//         url:url,
//         img:img,
//         title:title
//       };
//       console.log(data);
//
//
//     })
//   }
//   document.body.appendChild(iframe);
//
// })
