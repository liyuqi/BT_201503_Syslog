/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var mongodbAlert = require('./routes/mongodbAlert');
var mongoStatus = require('./routes/mongoStatus');
var sys_mongo = require('./routes/sys_mongo');
var sys_alert = require('./routes/sys_alert');

var http = require('http');
var path = require('path');

var settings = require('./settings');

//純粹當 session store，因為 monk 不知如何設定成express session
var MongoStore = require('connect-mongo')(express);

var monk = require('monk');
var dbevents = monk('127.0.0.1:27017/events');
var dbalerts = monk('127.0.0.1:27017/alerts');
var dbfluentd = monk('127.0.0.1:27017/fluentd');

var partials = require('express-partials');
var flash = require('connect-flash');

var sessionStore = new MongoStore({
						db : settings.db
					}, function() {
							console.log('connect mongodb success...');
					});

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(partials());
app.use(flash());

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
//app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.cookieParser());
app.use(express.session({
		secret : settings.cookie_secret,
		cookie : {
			maxAge : 60000 * 20	//20 minutes
		},
		store : sessionStore
}));

app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

//app.get('/sys_CRUD_index', sys_mongo.index);

app.get('/sys_CRUD_insert', sys_mongo.index);
app.post('/sys_CRUD_insert',sys_mongo.sys_CRUD_insert(dbfluentd));
app.get('/sys_CRUD_query', 	sys_mongo.sys_CRUD_loglist(dbfluentd));
app.post('/sys_CRUD_query', sys_mongo.sys_CRUD_query(dbfluentd));
app.get('/sys_CRUD_show', 	sys_mongo.sys_CRUD_count(dbfluentd));
//app.post('/sys_CRUD_show', 	sys_mongo.sys_CRUD_show(dbfluentd));

app.get('/sys_ALERT_insert',	sys_alert.index);
app.post('/sys_ALERT_insert', 	sys_alert.sys_ALERT_insert(dbfluentd));
app.get('/sys_ALERT_list', 		sys_alert.sys_ALERT_count(dbfluentd));
app.post('/sys_ALERT_list', 	sys_alert.sys_ALERT_list(dbfluentd));
app.get('/sys_ALERT_display', 	sys_alert.sys_ALERT_loglist(dbfluentd));
app.post('/sys_ALERT_display', 	sys_alert.sys_ALERT_query(dbfluentd));

/*
app.get('/sys_CRUD_insert', function(req, res){
	res.render('sys_CRUD_insert', { title: 'Create log', resp : false,layout: 'l2'});
});

app.post('/sys_CRUD_insert', function(fluentd){
	return function(req, res) {
		//console.log(req.body.timestamp);
		var reqTimestamp = req.body.timestamp || (new Date).getTime();

		var logmsg = {
			timestamp : reqTimestamp,
			identifier: req.body.identifier || '',
			message: req.body.msg || ''
		};
		var collection = mongodb.get('events');
		collection.insert(logmsg,{safe: true}, function(err, events){
			console.log("events data : " + util.inspect(events));
			// mongodb.close();
			res.render('sys_CRUD_insert', { title: 'Create log', resp : events,layout: 'l2'});
		});
	};
});

app.get('/sys_CRUD_query', function(fluentd){
	return function(req, res) {
		var collection = mongodb.get('events');

		collection.col.count({},function(err, count) {
			if(err) throw err;			//console.log(format("count = %s", count));
			res.render('sys_CRUD_query', {title: 'logs', totalcount : count,resp :null,layout: 'l2'});
		});
	};
});

app.post('/sys_CRUD_query', function(fluentd){
	return function(req, res) {

		var matchmsg = req.body.matchmsg || '';
		var message = new RegExp(matchmsg);

		var identifier = req.body.identifier || '';
		var sysid = new RegExp(identifier);

		var collection = mongodb.get('events');
		if (matchmsg.length < 1 && req.body.logid.length < 1 && identifier.length < 1 && req.body.matchdate.length < 1) {
			// console.log("return to loglist");
			res.redirect('/sys_CRUD_query');
		}
		if(matchmsg.length >0){
			collection.find(message,{limit : 20},function(e,docs){
				res.render('sys_CRUD_query', {title: 'logs', resp : docs,layout: 'l2'});
			});
		}
		else if(req.body.matchdate.length >0){
			start = new Date(req.body.matchdate.trim());
			if(req.body.matchenddate.trim().length <1)
				end = new Date();
			else end = new Date(req.body.matchenddate.trim());

			collection.find({"timestamp" : {"$gte": start,"$lte":end}},{limit : 20},function(e,docs){
				// console.log("docs data : "+util.inspect(docs));
				res.render('sys_CRUD_query', {title: 'logs', resp : docs,layout: 'l2'});
			});
		}
		else if(identifier.length >0){
			collection.find({"identifier":sysid},{limit : 20},function(e,docs){
				// console.log("docs data : "+util.inspect(docs));
				res.render('sys_CRUD_query', {title: 'logs', resp : docs,layout: 'l2'});
			});
		}
		else{
			collection.find({'_id' : req.body.logid},{limit : 20,sort : { timestamp : 1 }},function(e,docs){
				// console.log("docs data : "+util.inspect(docs));
				res.render('sys_CRUD_query', {title: 'logs', resp : docs,layout: 'l2'});
			});
		}
	};
});

app.get('/sys_CRUD_show', function (fluentd) {
	return function (req, res) {
		var collection = mongodb.get('events');

		collection.count({},function(err, count) {
			if(err) throw err;
			res.render('sys_CRUD_show', {title: 'logs', totalcount : count,resp :null,logdetail:null , layout: 'l2'});
		});
	};
});

app.post('/sys_CRUD_show', function (fluentd) {
	return function (req, res) {
		var collection = mongodb.get('events');

		collection.find({}, {limit: 20}, function (e, docs) {
			// console.log("docs data : "+util.inspect(docs));
			var docdetail;
			if (docs.length == 1) docdetail = util.inspect(docs);
			res.render('sys_CRUD_show', {title: 'logs', resp: docs, logdetail: docdetail, layout: 'l2'});
		});
	};
});
*/
app.get('/mongodbSetting', mongodbAlert.page);
app.post('/mongodbSetting', mongodbAlert.alertSetting(dbalerts));
app.get('/mongodbAlert', mongodbAlert.alertPush(dbevents,dbalerts));
app.get('/mongodbAlertPage', mongodbAlert.alertPushAll(dbevents,dbalerts));

app.get('/mongoStatus',mongoStatus.page);
app.post('/mongoStatus',mongoStatus.child());

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
