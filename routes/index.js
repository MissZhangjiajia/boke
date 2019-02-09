var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {isLogin:req.session.isLogin,username:req.session.username});
});
router.get('/text', function(req, res, next) {
  res.render('text');
});
router.get('/regist', function(req, res, next) {
  res.render('regist');
});
router.get('/head', function(req, res, next) {
  res.render('head', {isLogin:req.session.isLogin,username:req.session.username});
});
router.get('/login', function(req, res, next) {
  res.render('login');
});
router.get("/loginout",function(req, res, next) {
	req.session.username=null;
	req.session.isLogin=false;
	res.redirect("/login")
})
module.exports = router;
