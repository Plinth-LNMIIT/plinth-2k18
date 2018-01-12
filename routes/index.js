var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var User = require('../schema/user');
var Verify = require('./verify');

/* GET home page. */
router.get('/', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('index', {
            "page" : 'home',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('index',{
                    "page" : 'home',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
 
  
});

router.get('/about', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('about', {
            "page" : 'about',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('about',{
                    "page" : 'about',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
});

router.get('/archive', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('archive', {
            "page" : 'archive',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('archive',{
                    "page" : 'archive',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/competitions', Verify.verifyOrdinaryUser ,function(req, res, next) {
    
  
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('competitions', {
            "page" : 'competitions',
            "isLoggedIn" : isLoggedIn,
            
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('competitions',{
                    "page" : 'competitions',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user,
                     
                });
            }
        });
    }
  
  
});


router.get('/competitions/:category', Verify.verifyOrdinaryUser ,function(req, res, next) {
    var categories = ['astronomy', 'coding', 'robotics', 'quizzing', 'literature', 'management', 'design'];
    var competitionUrls = require('../data/competitions').competitionUrl;
    var category = req.params.category;
    var valid = false;
    if(categories.indexOf(category) > -1){
        valid = true;
    }
 

    if(req.decoded.sub === "")
    {
        isLoggedIn = false;

        if(valid){
            res.render('categories', {
                "page" : category,
                "isLoggedIn" : isLoggedIn,
                "category": category,
                "competitionUrl" : competitionUrls.competitions,
            });
        } else{
            res.redirect('/404');
        }
       
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                if(valid){
                    res.render('categories',{
                        "page" : category,
                        "isLoggedIn" : isLoggedIn,
                        "user" : user,
                        "category": category,
                        "competitionUrl" : competitionUrls.competitions,
                    });
                } else {
                    res.redirect('/404');
                }
               
            }
        });
    }
  
  
});

router.get('/competitions/:category/:competition', Verify.verifyOrdinaryUser ,function(req, res, next) {
    var competitionDetail = require('../data/competitions').competitions;
    var categories = ['astronomy', 'coding', 'robotics', 'quizzing', 'literature', 'management', 'design'];
    var competitions = {
        astronomy:['intotheuniverse', 'astrohunt', 'astroquiz'],
        coding:['iupc', 'enigma'],
        robotics:['robowar', 'robosoccer', 'droneobstruction', 'lfr', 'mazesolver', 'roborace', 'rcplane', 'transporter'],
        quizzing:['brandwagon', 'thequest'],
        literature:['rostrum'],
        management:['sif'],
        design:['pratibimb'],

    };
    var category = req.params.category;
    var competition = req.params.competition;
    var valid = false;

    var detail;
    if(categories.indexOf(category) > -1){

        if(competitions[category].indexOf(competition) > -1){
            valid = true;

            competitionDetail.competitions.forEach(element => {

                if(element.eventUrl == competition){
                    detail = element;
                }
            });
        }
        
    }
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;

        if(valid){
            res.render('competition', {
                "page" : competition,
                "isLoggedIn" : isLoggedIn,
                "competition" : detail,
            });
        } else {
            res.redirect('/404');
        }
   
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                if(valid){
                    res.render('competition',{
                        "page" : competition,
                        "isLoggedIn" : isLoggedIn,
                        "user" : user,
                        "competition" : detail,
                    });
                }else {
                    res.redirect('/404');
                }
               
            }
        });
    }
  
  
});


router.get('/contact', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('contact', {
            "page" : 'contact',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('contact',{
                    "page" : 'contact',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/ca', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('ca', {
            "page" : 'Campus Ambassador',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('ca',{
                    "page" : 'Campus Ambassador',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});


router.get('/faqs', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('faqs', {
            "page" : 'faqs',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('faqs',{
                    "page" : 'faqs',
                    "isLoggedIn" : isLoggedIn,
                    "user" :user
                });
            }
        });
    }
  
  
});

router.get('/gallery', Verify.verifyOrdinaryUser ,function(req, res, next) {
   
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('gallery', {
            "page" : 'gallery',
            "isLoggedIn" : isLoggedIn,
            
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('gallery',{
                    "page" : 'gallery',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user,
                   
                });
            }
        });
    }
  
});

router.get('/mun', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('mun', {
            "page" : 'mun',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
        
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('mun',{
                    "page" : 'mun',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/sop', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('sop', {
            "page" : 'sop',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('sop',{
                    "page" : 'sop',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/sponsors', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('sponsors', {
            "page" : 'sponsors',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('sponsors',{
                    "page" : 'sponsors',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/talks', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('talks', {
            "page" : 'talks',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('talks',{
                    "page" : 'talks',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/team', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('team', {
            "page" : 'team',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('team',{
                    "page" : 'team',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/terms', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('terms', {
            "page" : 'terms',
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('terms',{
                    "page" : 'terms',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});

router.get('/workshops', Verify.verifyOrdinaryUser ,function(req, res, next) {
    var workshopUrl = require('../data/workshops').workshopUrl;
    
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('workshops', {
            "page" : 'workshops',
            "isLoggedIn" : isLoggedIn,
            "workshopUrl" : workshopUrl.workshops,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
           
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('workshops',{
                    "page" : 'workshops',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user,
                    "workshopUrl" : workshopUrl.workshops,
                });
            }
        });
    }
  
  
});

router.get('/workshops/:workshop', Verify.verifyOrdinaryUser ,function(req, res, next) {

        var workshopDetail = require('../data/workshops').workshops;
        var worskhops = ['iot', 'scribbledstories','ethicalhacking','bitcoinblockchain','artificialintelligence'];
        var workshop = req.params.workshop;
        var detail;
        var valid = false;
         
        if(worskhops.indexOf(workshop) > -1){
            
                  
                        valid = true;
            
                        workshopDetail.workshops.forEach(element => {
                            
                            if(element.eventUrl == workshop){
                               
                                detail = element;
                            }
                        });
                
                    
                }


        if(req.decoded.sub === "")
        {
            isLoggedIn = false;
            if(valid){
                res.render('workshop', {
                    "page" : workshop,
                    "isLoggedIn" : isLoggedIn,
                    "workshop" : detail,
                });
            } else {
                res.redirect('/404');
            }
        }
        else {
            User.findOne({'email' : req.decoded.sub }, function(err, user) {
               
                isLoggedIn = user.valid;
                // if there are any errors, return the error
                if (err)
                    return done(err);
                // check to see if theres already a user with that email
                if (user){
                    if(valid){    
                        res.render('workshop',{
                            "page" : workshop,
                            "isLoggedIn" : isLoggedIn,
                            "user" : user,
                            "workshop" : detail,
                        });
                    } else {
                        res.redirect('/404');
                    }
                }
            });
        }
      
      
    });

router.get('/pronight', Verify.verifyOrdinaryUser ,function(req, res, next) {
    var eventUrl = require('../data/events').eventUrl;
    
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('events', {
            "page" : 'pronight',
            "isLoggedIn" : isLoggedIn,
            "eventUrl" : eventUrl.events,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
           
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('events',{
                    "page" : 'pronight',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user,
                    "eventUrl" : eventUrl.events,
                });
            }
        });
    }
  
  
});

router.get('/pronight/:event', Verify.verifyOrdinaryUser ,function(req, res, next) {

        var eventDetail = require('../data/events').events;
        var events = ['unerase'];
        var event = req.params.event;
        var detail;
        var valid = false;
         
        if(events.indexOf(event) > -1){
            
                  
                        valid = true;
            
                        eventDetail.events.forEach(element => {
                            
                            if(element.eventUrl == event){
                               
                                detail = element;
                            }
                        });
                
                    
                }


        if(req.decoded.sub === "")
        {
            isLoggedIn = false;
            if(valid){
                res.render('event', {
                    "page" : event,
                    "isLoggedIn" : isLoggedIn,
                    "event" : detail,
                });
            } else {
                res.redirect('/404');
            }
        }
        else {
            User.findOne({'email' : req.decoded.sub }, function(err, user) {
               
                isLoggedIn = user.valid;
                // if there are any errors, return the error
                if (err)
                    return done(err);
                // check to see if theres already a user with that email
                if (user){
                    if(valid){    
                        res.render('event',{
                            "page" : event,
                            "isLoggedIn" : isLoggedIn,
                            "user" : user,
                            "event" : detail,
                        });
                    } else {
                        res.redirect('/404');
                    }
                }
            });
        }
      
      
    });

router.get('/profile', Verify.verifyOrdinaryUser ,function(req, res, next) {
   
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.redirect(301,'/'); 
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('profile',{
                    "page" : 'profile',
                    "isLoggedIn" : isLoggedIn,
                    "user" : user
                });
            }
        });
    }
  
  
});


module.exports = router;
