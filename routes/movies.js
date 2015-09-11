var primewire = require('primewire');
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var passport = require('passport');
var request = require('request');
var cheerio = require('cheerio');
var needle = require('needle');
// the url you want to his is local host 3000/12345 12345 = movie your seraching
var urlArray ;
var innerResults;
console.log(innerResults);
console.log('____----____-');
router.get("/:id",function(req,res) {
  var search = req.params.id
  var url = 'http://www.primewire.ag/index.php?search_keywords='+search+'&key=81bc0fcf39e0538c&search_section=1'
  request(url, function (error, response, html){
    if (!error && response.statusCode == 200){
    $ = cheerio.load(html);


        var data={};
        innerResults=[];

        $('div.index_item.index_item_ie').each(function (){
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


          data = {
            url:url,
            img:img.substring(1,this.length),
            title:title.substring(6,this.length),
            id:id.substring(9,this.length),
            links: []
          };
          primewire({
              id: data.id
          }, display);
          console.log("=========================================");
          console.log(data.links);
          console.log(data.id);
          innerResults.push(data);



          function display(err, links, id) {
              if (err) {
                  return console.error(err.stack);
              }
              for(var i=0;i<links.length; i++){
                // for ( var j = 0 ; j < i ; j++ )
                  // console.log(data);
                  // console.log(id);
              }

                //console.log('%d total links found for "%s".', links.length, id);

                //linksArr = links
                console.log('links', links);
                console.log('data', data);

                innerResults.push(links);

                // console.log("I'm in the display-----------------------");
                // console.log(linksArr);

                // linksArr = linksArr.reduce(function(a, b){
                //      return a.concat(b);
                // });
                // console.log(linksArr);
          }


        }); //end .each function
        console.log(innerResults);




        // Using an ID instead of title/year will result in less page load time.

        // primewire({
        //     id: data.id
        // }, display);
        res.json({data:innerResults})







      }//end if statement

    });//end request()
})//end router.get


module.exports = router;
