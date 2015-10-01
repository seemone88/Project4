var primewire = require('primewire');
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var passport = require('passport');
var request = require('request');
var cheerio = require('cheerio');
var needle = require('needle');
var urlArray ;
var innerResults;


router.get("/:id",function(req,res) {
  var search = req.params.id
  var url = 'http://www.primewire.ag/index.php?search_keywords='+search+'&key=81bc0fcf39e0538c&search_section=1'

  request(url, function (error, response, html){
    if (!error && response.statusCode == 200){
    $ = cheerio.load(html);

        movies=[];
        var links=[];
        allLinks=[];

        $('div.index_item.index_item_ie').each(function(){
          var self = this;
          var results=[];
          // var urls = [];
          var a = $(this).children();
          var b = $(this).children().children();
          var c = $(this).children().next().children();
          var url = a.attr('href');
          var img = b.attr('src');
          var title = a.attr('title')
          var id = c.attr('id');


          movie = {
            url:url,
            img:img.substring(1,this.length),
            title:title.substring(6,this.length),
            id:id.substring(9,this.length)

          };
          movies.push(movie);
          var movieCount = movies.length;
          var i = 0;
          function getLinks(index) {
            primewire({
              id: movies[index].id
            }, function(err, links, id) {
              if (err) {
                  return console.error(err.stack);
              }
              //
              console.log(links);
              movies[index].links = links;
              if(i < (movieCount - 1)) {
                i ++;
                getLinks(i);
              } else{
                res.json({data:movies});
              }
            })
          }

          getLinks(i);
        }); //end .each function



      }//end if statement
    });//end request()
})//end router.get


module.exports = router;
