//mongo localhost:27017/events "c:/Users/liyu/Desktop/.js"
var level = ["warn","error","info","login","logout"];
var host = ["host1","host2","host3"];
var ip = ["172.17.24.190","172.17.24.148","172.17.24.132"];
var message = ["1","2","3","4","5"];

for(var i =0;i<15000;i++){
var item = {
	'time':new Date(),
	'level':level[Math.floor(Math.random()*level.length)],
	'host':host[Math.floor(Math.random()*host.length)],
	'host':{ip:ip[Math.floor(Math.random()*ip.length)]},
	'message':Math.floor(Math.random()*5+1)
}
db.events.insert(item);
}