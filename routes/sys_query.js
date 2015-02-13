/**
 * Created by Yuqi on 2015/2/10.
 */
/*> db.logs.findOne()
{
    "_id" : ObjectId("54d966730778511cff000009"),
    "identifier" : "%PIX-6-302005",
    "message" : "Built UDP connection for faddr 198.207.223.240/53337 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
    "TIMESTAMP" : "2015-02-10T10:01:23+08:00",             //寫入時間
    "time" : ISODate("2004-03-29T01:54:18Z")               //syslog時間
}
*/
var util = require('util');
var _pageunit = 10;

exports.sys_ALERT_insert = function(mongodb){
    return function(req, res) {
        var rule = {};
        var collection = mongodb.get('alerts');

        if(req.body.identifier){
            rule.identifier = /*$regex:*/ new RegExp('.*'+req.body.identifier);
        }
        if(req.body.matchmsg){
            rule.message = /*$regex:*/ new RegExp('.*'+req.body.matchmsg);
        }
        if(req.body.logid){
            rule._id = req.body.logid;
        }

        console.log('event= '+util.inspect(rule));
        if(rule){
            collection.insert({event:rule,time:new Date()},{safe: true}, function(err, docs){
                console.log("alert data : " + JSON.stringify(docs) + util.inspect(docs));
                res.render('sys_ALERT_insert', { title: 'Create log', resp :docs,layout: 'l2'});
                if(err) res.redirect('/sys_ALERT_insert');
            });
        }
    };
};

/*exports.sys_ALERT_query = function(mongodb){
 return function(req, res) {
 var collectionAlert = mongodb.get('alerts');
 var event_string = req.query.event || null;
 var event;
 collectionAlert.find({_id:event_string},function(err,alerts){
 event = util.inspect(alerts.event);
 console.log('alert_event: '+event);
 });

 //console.log('sysid:'+util.inspect(sysid)+'sysid.length:'+sysid.length);
 var collectionLog = mongodb.get('logs');
 //var collection = mongodb.get('alerts');
 if (event.length < 1) {
 res.redirect('/sys_ALERT_display');
 }
 if(event.length >0){
 collectionLog.count(event,function(err,count){
 collectionLog.find(JSON.parse(event),{limit : 20},function(err,docs){
 console.log('event_log: '+util.inspect(event) + ' '+docs.length);
 res.render('sys_ALERT_display', {title: 'alert display',totalcount : count, resp : docs});
 });
 })
 }
 else{
 res.redirect('/sys_ALERT_display');
 }
 };
 };*/

exports.sys_CRUD_query = function(mongodb){
    return function(req, res) {

        var query = {};
        var collection = mongodb.get('logs');
        //field
        if(req.body.matchdate){
            if(req.body.matchenddate){
                query.time = {$gte:new Date(req.body.matchdate.trim()), $lt: new Date(req.body.matchenddate.trim())};
            }else{
                query.time = {$gte:new Date(req.body.matchdate.trim())};
            }
        }
        if(req.body.matchenddate){
            if(req.body.matchdate){
                query.time = {$gte:new Date(req.body.matchdate.trim()), $lt: new Date(req.body.matchenddate.trim())};
            }else{
                query.time = {$lt :new Date(req.body.matchenddate.trim())}
            }
        }
        if(req.body.identifier){
            query.identifier = {$regex: new RegExp('.*'+req.body.identifier)};
        }
        if(req.body.matchmsg){
            query.message = {$regex: new RegExp('.*'+req.body.matchmsg)}
        }
        if(req.body.logid){
            query._id = req.body.logid;
        }

        //query
        console.log(query);
        collection.find(query /*,{limit : 20}*/,function(err,docs){
            console.log('docs.length: '+docs.length);
            if(err) res.redirect('/sys_CRUD_query');
            res.render('sys_CRUD_display', {title: 'logs', totalcount: docs.length, resp: docs, layout: 'l2'});
        });
    };
};
