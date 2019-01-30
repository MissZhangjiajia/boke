var express = require('express');
var router = express.Router();
var MongoClient = require("mongodb").MongoClient;
var url="mongodb://localhost:27017";

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//注册
router.post("/regist",(req,res)=>{
	var data=req.body;
	var username=data.username;
	MongoClient.connect(url,{ useNewUrlParser: true },(err,db)=>{
		if(err) throw err;
		var mydb=db.db("mydb");
		var users=mydb.collection("users");
		users.find({username:username}).toArray((err,result)=>{
			if(result.length!=0){
				res.send("0");
			}
			if(result.length==0){
				users.insertOne(data,(err,result)=>{
					res.send("1");
				})
			}
			db.close();
		})
	})
});
//登录
router.post("/login",(req,res)=>{
	var data=req.body;
	var username=data.username;
	MongoClient.connect(url,{ useNewUrlParser: true },(err,db)=>{
		if(err) throw err;
		var mydb=db.db("mydb")
		var users=mydb.collection("users");
		users.find(data).toArray((err,result)=>{
			if(result.length==0){
				res.send("0")
			}else{				
				req.session.username=username;
				req.session.isLogin = true;	
				res.send("1");
			}
			db.close();	
		})
			
	})
})
module.exports = router;
