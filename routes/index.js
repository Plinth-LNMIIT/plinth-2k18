var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var Eventx = require('../schema/event');
var User = require('../schema/user');
var Verify = require('./verify');

/* GET home page. */
router.get('/', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('index', {
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
                });
            }
        });
    }
  
  
});

router.get('/contact', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('contact', {
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
                });
            }
        });
    }
  
});

router.get('/mun', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('about', {
            "isLoggedIn" : isLoggedIn,
        });
    }
    else {
        User.findOne({'email' : req.decoded.sub }, function(err, user) {
            console.log(user);
            isLoggedIn = user.valid;
            // if there are any errors, return the error
            if (err)
                return done(err);
            // check to see if theres already a user with that email
            if (user){
                res.render('mun',{
                    "page" : 'mun',
                    "isLoggedIn" : isLoggedIn,
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
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
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
                });
            }
        });
    }
  
  
});

router.get('/workshops', Verify.verifyOrdinaryUser ,function(req, res, next) {
    if(req.decoded.sub === "")
    {
        isLoggedIn = false;
        res.render('workshops', {
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
                res.render('workshops',{
                    "page" : 'workshops',
                    "isLoggedIn" : isLoggedIn,
                    "user" : {
                        name : user.name,
                        gender : user.gender,
                    }
                });
            }
        });
    }
  
  
});

router.get('/profile', Verify.verifyOrdinaryUser ,function(req, res, next) {
    console.log(req.decoded);
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

router.get('/redirect',function(req, res, next) {

    res.render('redirect',{
        isLoggedIn : false,
        valid : false,
    });
});

module.exports = router;
