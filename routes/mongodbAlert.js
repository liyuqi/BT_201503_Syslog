//mongodbDemo
//var mongodb = require('../models/db.js');
var util = require('util');
var io = require('socket.io');

exports.page = function(req, res){
  //res.render('mongodbSetting', { title: 'add' ,layout: 'l2'});
  res.render('mongodbSetting', { title: 'Create log', resp : false,layout: 'l2'});
};
exports.dropAlert = function(mongodbA){
	return function(req,res){
		if(req.body.dropCheck){
			var collection = mongodbA.get('alerts');
			collection.drop(function(err,reply){
				res.render('mongodbSetting',{title: 'Create alert', resp : reply,layout: 'l2'});
			});
		}
	};
};

exports.alertSetting = function (mongodbA) {
	
	return function (req, res) {

		var timer = req.body.optionsRadios;//(req.body.optionsRadios>1)?(req.body.timer1):(req.body.timer2);
		var set1 = req.body.setting1;
		var set2 = req.body.setting2;
		console.log(timer);
		//timer: 60
		var collection = mongodbA.get('alerts');

		collection.count({}, function (err, alerts) {
			if (alerts < 1) {
				console.log(alerts);
				collection.insert({'setting1': set1, 'setting2': set2, 'timer': timer});
			}
			collection.findAndModify({}, {
				$set: {
					'setting1': set1,
					'setting2': set2,
					'timer': timer
				}
			}, function (err, alerts) {
				console.log("alerts data : " + util.inspect(alerts));
				res.render('mongodbSetting', {title: 'Create alert', resp: alerts, layout: 'l2'});
			});
		});
	    }
    };

exports.alertPush = function (mongodb,mongodbA) {
	return function (req, res) {

		var collectionA = mongodbA.get('alerts');

		collectionA.find({}, function (err, alerts) {
			console.log(alerts);
			var set1 = alerts[0].setting1;
			var set2 = alerts[0].setting2;
			var timer = alerts[0].timer;
			var t1 = new Date(new Date() - timer);
			var t2 = new Date;
			//console.log(t1.toLocaleTimeString());
			//console.log(t2.toLocaleTimeString());

			var collection = mongodb.get('fluentd'); //'message':{$in:['m1','m2']
			collection.find({'message':{$in:[set1,set2]},'timestamp':{$gt:(new Date-timer)}},function(e,docs){	
				// console.log("docs data : "+util.inspect(docs));
				var docdetail;
				if(docs.length==1) docdetail = util.inspect(docs);
				res.render('mongodbAlert', {title: 'Alert', resp : docs,timer1:t1,timer2:t2,seccount:timer, logdetail : docdetail,layout: 'l2'});

				if(err) res.render('mongodbSetting',{title: 'Create alert', resp : reply,layout: 'l2'});
			});
		});
	}
};

exports.alertPushAll = function (mongodb,mongodbA) {
	return function (req, res) {
		var query;
		var page = req.query.p ? parseInt(req.query.p) : 1;
		var collectionA = mongodbA.get('alerts');
		collectionA.find({}, function (err, alerts) {
			//console.log(alerts);
			var set1 = alerts[0].setting1;
			var set2 = alerts[0].setting2;
			query = {
			'message' : {$in : [set1, set2]	}
			};

			var collection = mongodb.get('fluentd');
			collection.count(query, function (err, total) {
				//根据 query 对象查询，并跳过前 (page-1)*10 个结果，返回之后的 10 个结果
				collection.find(query,
					{skip : (page - 1) * 10,limit : 10,sort : { timestamp : -1 }},function(e,docs){
						res.render('mongodbAlertPage', {
							title : 'Alert Page',
							resp : docs,
							page : page,
							pageTotal : Math.ceil(total/10),
							isFirstPage : (page - 1) == 0,
							isLastPage : ((page - 1) * 10 + docs.length) == total,
							layout: 'l2'
						});
						if(err) res.render('mongodbSetting',{title: 'Create alert', resp : reply,layout: 'l2'});
					});
			});
		});
		

	}
};