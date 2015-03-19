/**
 * Module dependencies.
 */

var fs = require('fs');
var logFile = fs.createWriteStream('./nodeLogFile.log', {flags: 'a'});

var express = require('express');
var routes = require('./routes');

//var mongodbAlert = require('./routes/mongodbAlert');
//var mongoStatus = require('./routes/sys_mongoShell');
var sys_mongo = require('./routes/sys_mongo');

var sys_alert = require('./routes/sys_alert');

var util = require('util');
var http = require('http');
var path = require('path');

var settings = require('./settings');

//純粹當 session store，因為 monk 不知如何設定成express session
var MongoStore = require('connect-mongo')(express);

var monk = require('monk');
//var dbevents = monk('192.168.0.190/events');
//var dbalerts = monk('192.168.0.190/alerts');
var dbfluentd = monk('127.0.0.1/fluentd');
//var dbfluentd = monk('172.17.24.196/fluentd');

var partials = require('express-partials');
var flash = require('connect-flash');

var sessionStore = new MongoStore({
	host: settings.host, //define this, otherwise it throws "Error: failed to connect to [1276.0.0.1:27017]"
	port: settings.port,
	db: settings.db
}, function () {
	console.log('connect mongodb success...');
});

var app = express();
//app.locals.inspect = require('util').inspect;
app.locals.util = require('util');
// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.logger({stream: logFile}));
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
	secret: settings.cookie_secret,
	cookie: {
		maxAge: 60000 * 20	//20 minutes
	},
	store: sessionStore
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
//app.get('/sys_ALERT_list', 		sys_alert.sys_ALERT_count(dbfluentd));
app.get('/sys_ALERT_list', 		sys_alert.sys_ALERT_list(dbfluentd));
//app.get('/sys_ALERT_display', 	sys_alert.sys_ALERT_loglist(dbfluentd));
app.get('/sys_ALERT_display', 	sys_alert.sys_ALERT_timeInterval(dbfluentd));
app.post('/sys_ALERT_display', 	sys_alert.sys_ALERT_timeInterval(dbfluentd));
app.get('/sys_ALERT_delete', 	sys_alert.sys_ALERT_delete(dbfluentd));
//app.post('/sys_ALERT_display', 	sys_alert.sys_ALERT_query(dbfluentd));
app.use('/sys_ALERT_event', 	sys_alert.sys_ALERT_event(dbfluentd));


//app.get('/test_page_timePicker', function(req,res){
//	res.render('test_page_timePicker', { title: 'test_page_timePicker', resp : false});
//});

//app.get('/mongoStatus',mongoStatus.page);
//app.post('/mongoStatus',mongoStatus.child());

//app.get('/mongodbSetting', mongodbAlert.page);
//app.post('/mongodbSetting', mongodbAlert.alertSetting(dbalerts));
//app.get('/mongodbAlert', mongodbAlert.alertPush(dbevents,dbalerts));
//app.get('/mongodbAlertPage', mongodbAlert.alertPushAll(dbevents,dbalerts));
//
//app.get('/mongoStatus',mongoStatus.page);
//app.post('/mongoStatus',mongoStatus.child());

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
