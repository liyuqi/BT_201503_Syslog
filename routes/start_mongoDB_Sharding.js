var readline = require('readline'),
    rl = readline.createInterface(process.stdin, process.stdout);
var childprocess = require('child_process');

var outstr = "Choose a function : \n all) start mongod configsrv mongos. \n one) start a mongod. \n test) prompt a test."; 
var cmdline1 = "ls /home/btserver1/";

//var newTernal = "gnome-terminal -x sh -c '"+cmdline1+"|less'";
var mongodCmd1 = "mongod --shardsvr --port 20000 --dbpath /home/btserver1/mongoDB/data/shard/s0 --fork --logpath /home/btserver1/mongoDB/data/shard/s0.log --directoryperdb";
// var mongodCmd2 = "mongod --shardsvr --port 20001 --dbpath /home/btserver1/mongoDB/data/shard/s1 --fork --logpath /home/btserver1/mongoDB/data/shard/s1.log --directoryperdb";
var mongoConfifsvr1 = "mongod --configsvr --port 30000 --dbpath /home/btserver1/mongoDB/data/shard/config --fork --logpath /home/btserver1/mongoDB/data/shard/config.log --directoryperdb";
var mongosCmd1 = "mongos --port 40000 --configdb btserver1:30000 --fork --logpath /home/btserver1/mongoDB/data/shard/route.log --chunkSize 1";

var mongodSingle = "mongod --config /etc/mongodb.conf";


rl.setPrompt('cmd> '+outstr+'\n\n\n');
rl.prompt();

rl.on('line', function(line) {
  switch(line.trim()) {
    case 'all':
      // 會用這樣的寫法是因為 node.js 是 non -blocking的緣故
      processexec(newTerminalStr(mongodCmd1));
      setTimeout(function(){processexec(newTerminalStr(mongoConfifsvr1))},1000);
      setTimeout(function(){processexec(newTerminalStr(mongosCmd1))},2000);  
      ////processexec(newTerminalStr(mongodCmd2));
      // processexec(newTerminalStr(mongoConfifsvr1));
      // processexec(newTerminalStr(mongosCmd1));
      // if(isMongodsStart){
        console.log('start mongod + configsrv + mongos......');
      // }
      break;
    case 'one':
      //processexec("ls /home/btserver1/mongoDB");
      processexec(mongodSingle);
      console.log('start a mongod ......');
      break;
    case 'test':
      processexec(newTerminal());
      console.log('start a mongod ......');
      break;          
    default:
      console.log('Choose a function : all) one)`' + line.trim() + '`');
      break;
  }
  rl.prompt();
}).on('close', function() {
  console.log('Remember shutdown all mongo daemons!');
  process.exit(0);
});

function newTerminalStr(cmdstr){
  // return "gnome-terminal -x sh -c '"+cmdstr+"|less'"; ==> 會跳出視窗
  //return "gnome-terminal -x sh -c '"+cmdstr+"'";
  return "notepad";
}

function newTerminal(){
  // return "gnome-terminal -x sh -c '"+cmdstr+"|less'"; ==> 會跳出視窗
  //return "gnome-terminal -x sh -c '"+cmdstr+"'";
  return "notepad";
}

function processexec(cmdstr){
  childprocess.exec(cmdstr,
    function (error, stdout, stderr) {
      console.log('stdout: \n' + stdout);
      if(stderr.trim().length < 2){
        console.log("Press Enter......"+'\n\n');
      }else{
        console.log('stderr: \n' + stderr);
      }
    
      if (error !== null) {
        console.log('exec error: ' + error);
      }
  });
}