var util = require('util');
//var process = require('./start_mongoDB_Sharding');
var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);
var childprocess = require('child_process');

exports.page = function (req, res) {
	res.render('mongoStatus', {	title : 'Create log',resp : false,layout : 'l2'	});
};
exports.child = function(){
	
    return function(req, res) {
	//var mongoOption = req.body.mongoOption
	//console.log(mongoOption);
	if(req.body.mongoOption>0)	processexec();
	console.log("child exec"+'\n\n');
	res.render('mongoStatus', { title: 'mongo status', mongodSwitch:'no',layout: 'l2'});
	};
}

function newTerminal() {
	// return "gnome-terminal -x sh -c '"+cmdstr+"|less'"; ==> open terminal window
	return "gnome-terminal -x sh -c";
	//return "mongod --config /etc/mongodb.conf";
	//return "calc";
	console.log('calc');
}

function processexec() {
	childprocess.exec(newTerminal());
	console.log('child_process');
}
