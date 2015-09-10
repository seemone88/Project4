var primewire = require('primewire');
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var passport = require('passport');

router.get('/', function(req,res){
function (err, links, id, data) {
    if (err) {
        return console.error(err.stack);
    }
    for(i=0;i<links.length; i++){
      console.log(links[i]);
      res.render('movies/links',{data:data});
    }
      console.log('%d total links found for "%s".', links.length, id);
}
primewire({
    id: '2758609' // http://www.primewire.ag/watch-1672-Saw-II
}, display);

})
module.exports = router;
