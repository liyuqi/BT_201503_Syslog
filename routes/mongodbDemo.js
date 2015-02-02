//mongodbDemo
// var mongodb = require('../models/db.js');
var util = require('util');
exports.prac1 = function(req, res){
  //res.render('mongodbDemo1', { title: 'mongodbDemo1' ,layout: 'l2'});
  res.render('mongodbDemo1', { title: 'Create log', resp : false,layout: 'l2'});
};

exports.loglist = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('events');
        //找出age > 200 , 只傳回10筆，依照 age 排序
        //  collection.find({"timestamp" : {"$gt": new Date("2014-01-27T00:00:00.000Z")}},{limit : 20,sort : { level : 1 }},function(e,docs){	
		
         collection.count({},function(err, count) {
         	if(err) throw err;
           //console.log(format("count = %s", count));
           res.render('loglist', {title: 'logs', totalcount : count,resp :null,layout: 'l2'});
         }); 
    };
};

exports.findlog = function(mongodb){
    return function(req, res) {
    	var logmsg = {
    		message:  new RegExp(req.body.matchmsg.trim())
		};

		var ipcond = new RegExp(req.body.hostip.trim());

        var collection = mongodb.get('events');
        if(req.body.matchmsg.length <1 && req.body.logid.length <1 && req.body.hostip.length <1 && req.body.matchdate.length <1){
        	// console.log("return to loglist");
        	res.redirect( '/loglist' );
        }
        if(req.body.matchmsg.length >0){
        	collection.find(logmsg,{limit : 20},function(e,docs){	
             	res.render('loglist', {title: 'logs', resp : docs,layout: 'l2'});
        	});
    	}
    	else if(req.body.matchdate.length >0){
    		start = new Date(req.body.matchdate.trim());
    		if(req.body.matchenddate.trim().length <1)
    			end = new Date();
    		else end = new Date(req.body.matchenddate.trim());
    		
        	collection.find({"timestamp" : {"$gte": start,"$lte":end}},{limit : 20},function(e,docs){
        		// console.log("docs data : "+util.inspect(docs));
             	res.render('loglist', {title: 'logs', resp : docs,layout: 'l2'});
        	});
    	}
    	else if(req.body.hostip.length >0){
        	collection.find({"host.ip":ipcond},{limit : 20},function(e,docs){	
        		 // console.log("docs data : "+util.inspect(docs));
             	res.render('loglist', {title: 'logs', resp : docs,layout: 'l2'});
        	});
    	}
    	else{
         collection.find({'_id' : req.body.logid},{limit : 20,sort : { timestamp : 1 }},function(e,docs){	
            // console.log("docs data : "+util.inspect(docs));
            res.render('loglist', {title: 'logs', resp : docs,layout: 'l2'});
        });
        }
    };
};

exports.createlogdata = function(mongodb){

	  return function(req, res) {
	  	var reqTimestamp = req.body.timestamp;
	  	if(reqTimestamp.length <1) reqTimestamp=(new Date).getTime();
	  	var logmsg = {
    		level: req.body.leveltype,
    		timestamp : reqTimestamp,
    		message: req.body.msg,
    		host:{
    			ip: req.body.clientip
    		}
		};
		var collection = mongodb.get('events');
		 collection.insert(logmsg,{safe: true}, function(err, events){
		 		console.log("events data : "+util.inspect(events));
		    	// mongodb.close();
		    	res.render('mongodbDemo1', { title: 'Create log', resp : events,layout: 'l2'});
	     });
    };
};

exports.twentyloglist = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('events');
        //找出age > 200 , 只傳回10筆，依照 age 排序
         // collection.find({"timestamp" : {"$gt": new Date("2014-01-27T00:00:00.000Z")}},{limit : 20,sort : { timestamp : -1 }},function(e,docs){	
		
         collection.count({},function(err, count) {
         	if(err) throw err;
           res.render('twentyloglist', {title: 'logs', totalcount : count,resp :null,logdetail:null , layout: 'l2'});
         }); 
    };
};

exports.findlogNoRegularExp = function(mongodb){
    return function(req, res) {
		var ipcond = req.body.hostip.trim();
		
        var collection = mongodb.get('events');
        if(req.body.hostip.length <1){
        	console.log("redirect...");
        	res.redirect( '/twentyloglist' );
        }
		if(req.body.hostip.length >0){
        	collection.find({"host.ip":ipcond},{limit : 20},function(e,docs){	
        		 // console.log("docs data : "+util.inspect(docs));
        		 var docdetail;
        		if(docs.length==1) docdetail = util.inspect(docs);
             	res.render('twentyloglist', {title: 'logs', resp : docs, logdetail : docdetail,layout: 'l2'});
        	});
    	}
    };
};

exports.alertPush = function(mongodb){
return function(req, res) {
		var str = 'error'
		var level = str.trim();

        var collection = mongodb.get('events');
		//if(req.body.hostip.length >0){
        	collection.find({"level":level},{limit : 20},function(e,docs){	
        		 // console.log("docs data : "+util.inspect(docs));
        		 var docdetail;
        		if(docs.length==1) docdetail = util.inspect(docs);
             	res.render('mongodbAlert', {title: 'logs', resp : docs, logdetail : docdetail,layout: 'l2'});
        	});
    	//}
    };
};