var express = require('express');
var router = express.Router();
 
 
/* GET home page. */
router.get('/',function(req, res, next) {
    
    res.render('index' );
  
});

router.get('/about',function(req, res, next) {
    res.render('about');
  
});

router.get('/archive',function(req, res, next) {
    res.render('archive');
  
});

router.get('/competitions',function(req, res, next) {
    res.render('competitions');
  
});

router.get('/contact',function(req, res, next) {
    res.render('contact');
  
});

router.get('/faqs',function(req, res, next) {
    res.render('faqs');
  
});

router.get('/gallery',function(req, res, next) {
    res.render('gallery');
  
});

router.get('/mun',function(req, res, next) {
    res.render('mun');
  
});

router.get('/sop',function(req, res, next) {
    res.render('sop');
  
});

router.get('/sponsors',function(req, res, next) {
    res.render('sponsors');
  
});

router.get('/talks',function(req, res, next) {
    res.render('talks');
  
});

router.get('/team',function(req, res, next) {
    res.render('team');
  
});

router.get('/terms',function(req, res, next) {
    res.render('terms');
  
});

router.get('/workshops',function(req, res, next) {
    res.render('workshops');
  
});

module.exports = router;
