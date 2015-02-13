var util = require('util');
var fs = require('fs');
//var process = require('./start_mongoDB_Sharding');
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);
var childprocess = require('child_process');

exports.page = function (req, res) {
	processexec();//childprocess.exec(newTerminal());//
	console.log('gen logs');
	res.render('mongoStatus', {	title : 'Create log',resp : false});
};
exports.child = function(){
    return function(req, res) {
	//var mongoOption = req.body.mongoOption
	//console.log(mongoOption);
	if(1) processexec();//childprocess.exec(newTerminal());
		console.log('child '+_dirname);
	res.render('mongoStatus', { title: 'mongo status'});
	};
};

function newTerminal() {
	// return "gnome-terminal -x sh -c '"+cmdstr+"|less'"; ==> open terminal window
	console.log(_dirname);
	//fs.read(_dirname+'/genSyslog.js',function(path){
	//	console.log('gen syslog '+path);
		return "mongo localhost/fluentd"+ _dirname+'/genSyslog.js';
	//});

	//return "mongod --config /etc/mongodb.conf";
	//return "calc";
	//console.log('calc');
}

function processexec() {
	childprocess.exec(newTerminal());
	console.log('child_process');
}
