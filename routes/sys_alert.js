/*** Created by Yuqi on 2015/1/21. */
// var mongodb = require('../models/db.js');
var util = require('util');
_interval = 1*60*1000; //{時:1*60*60*1000, 分:1*60*1000, 秒:1000}
_time_offset = 8*60*60*1000; // timezone offset +8 hours * 60 min * 60 sec * 1000 ms
_pageunit = 50;

exports.index = function(req, res){
    res.render('sys_ALERT_insert', { title: 'insert rule', resp : false});
};

exports.sys_ALERT_insert = function(mongodb){
    return function(req, res) {

        var rule = {};
        var collection = mongodb.get('alerts');

        if(req.body.identifier){
            rule.identifier = /*$regex:*/ new RegExp('.*'+req.body.identifier.trim());
        }
        if(req.body.facility){
            rule.facility = /*{$regex:*/ new RegExp('.*'+req.body.facility.trim())/*}*/;
        }
        if(req.body.severity){
            rule.severity = /*{$regex:*/ new RegExp('.*'+req.body.severity.trim())/*}*/;
        }
        if(req.body.mnemonic){
            rule.mnemonic = /*{$regex:*/ new RegExp('.*'+req.body.mnemonic.trim())/*}*/;
        }
        if(req.body.matchmsg){
            rule.message = /*$regex:*/ new RegExp('.*'+req.body.matchmsg.trim());
        }
        if(req.body.enrich){
            rule.enrich = req.body.enrich.trim();
        }
        /*if(req.body.logid){
            rule._id = req.body.logid;
        }*/

        console.log('event= '+util.inspect(rule));
        if(rule){
            collection.insert({event:rule,time:new Date()},{safe: true}, function(err, docs){
                console.log("alert data : " + JSON.stringify(docs) + util.inspect(docs));
                res.render('sys_ALERT_insert', { title: 'insert rule', resp :docs});
                if(err) res.redirect('/sys_ALERT_insert');
            });
        }
    };
};

exports.sys_ALERT_list = function (mongodb) {
    return function (req, res) {
        var collection = mongodb.get('alerts');

        collection.count({}, function (err, count) {
            collection.find({}, function (err, docs) {
                // console.log("docs data : "+util.inspect(docs));
                var docdetail;
                if (docs.length == 1) docdetail = util.inspect(docs);
                //console.log(util.inspect(docs));
                res.render('sys_ALERT_list', {
                    title: 'alert list', totalcount: count, resp: docs, logdetail: docdetail
                });
            });
        });
    };
};

exports.sys_ALERT_loglist = function(mongodb){
    return function(req, res) {
        var collectionAlert = mongodb.get('alerts');
        var event = {};

        //console.log('url._id: '+req.query._id);
        if (!req.query._id) res.redirect('/sys_ALERT_list');
        else {
            collectionAlert.find({_id: req.query._id}, function (err, alerts) {
                if (err) res.redirect('/sys_ALERT_timeInterval');
                else {
                    if (!alerts) res.redirect('/sys_ALERT_list');
                    else {
                        event = alerts[0].event;
                        //console.log('event: '+util.inspect(event));
                        //console.log('sysid:'+util.inspect(sysid)+'sysid.length:'+sysid.length);
                        var collectionLog = mongodb.get('logs');

                        if (event) {
                            collectionLog.count(event, function (err, count) {
                                collectionLog.find(event, {limit: _pageunit,sort : { time : -1, _id:-1}}, function (err, docs) {
                                    console.log('event_log: ' + util.inspect(event) + ' ' + docs.length);
                                    res.render('sys_ALERT_timeInterval', {
                                        title: 'alert display',
                                        totalcount: count,

                                        resp: docs
                                        //,start: start
                                        //,end: end
                                    });
                                });
                            })
                        }
                        else { res.redirect('/sys_ALERT_timeInterval'); }
                    }
                }
            });
        }
    };
};

exports.sys_ALERT_timeInterval = function (mongodb) {
    return function (req, res) {

        var ruleNow = new Date();//('2004-03-29T01:55');
        var ruleBack = new Date(new Date-_interval);//(new Date().setTime(ruleStart.getTime() + _interval));

        var collectionAlert = mongodb.get('alerts');
        var event = {};
        //console.log('url._id: '+req.query._id);
        if (!req.query._id) res.redirect('/sys_ALERT_list');
        else {
            collectionAlert.find({_id: req.query._id}, function (err, alerts) {
                if (err) res.redirect('/sys_ALERT_timeInterval');
                else {
                    if (!alerts) res.redirect('/sys_ALERT_list');
                    else {
                        event = alerts[0].event;
                        event.TIMESTAMP = {//----------------------------TIMESTAMP---------------//
                            $gt: new Date(new Date-_interval)
                            //,$lte: ruleEnd
                        };
                        //console.log('event: '+util.inspect(event));
                        //console.log('sysid:'+util.inspect(sysid)+'sysid.length:'+sysid.length);
                        var collectionLog = mongodb.get('logs');

                        if (event) {
                            collectionLog.count(event, function (err, count) {
                                collectionLog.find(event, {limit: _pageunit,sort : { time : -1, _id:-1}}, function (err, docs) {
                                    console.log('event_log: ' + util.inspect(event) + ' ' + count);
                                    res.render('sys_ALERT_timeInterval', {
                                        title: 'alert display',
                                        timeinterval:_interval,
                                        totalcount: count,
                                        resp: docs,
                                        start: ruleBack,//.getTime(),
                                        end: ruleNow//.getTime()
                                    });
                                });
                            })
                        }
                        else { res.redirect('/sys_ALERT_timeInterval'); }
                    }
                }
            });
        }
    };
};

exports.sys_ALERT_delete = function(mongodb){
    return function(req, res) {
        var collectionAlert = mongodb.get('alerts');

        if (!req.query._id) res.redirect('/sys_ALERT_list');
        else {
            collectionAlert.remove({_id: req.query._id}, function (err) {
                if (err) res.redirect('/sys_ALERT_list');

                console.log('sys_ALERT_delete');
                res.redirect('/sys_ALERT_list');
            });
        }
    };
};

// timezone offset +8 hours * 60 min * 60 sec * 1000 ms
//[{ $add: [ "$time", 8*60*60*1000 ]}]
exports.sys_ALERT_event = function(mongodb){
    return function(req, res) {

        var collection = mongodb.get('logs');

        console.log("flow : ");
        collection.col.aggregate([
            {$project:{
                  _id:1
                , year: {$year:     [{ $add: [ "$time", 8*60*60*1000 ]}]}         // , year: {$year: "$time"}
                , month:{$month:    [{ $add: [ "$time", 8*60*60*1000 ]}]}        // , month:{$month: "$time"}
                , day:  {$dayOfMonth: [{ $add: [ "$time", 8*60*60*1000 ]}]}   // , day:  {$dayOfMonth: "$time"}
                , hour: {$hour: [{ $add: [ "$time", 8*60*60*1000 ]}]}         // , hour: {$hour: "$time"}
                //, minute: {$minute: [{ $add: [ "$time", 8*60*60*1000 ]}]}   // , minute: {$minute: "$time"}
                , time: 1
                , facility : 1
                , severity : 1
                , mnemonic : 1
                , identifier: 1
            }}
            ,{$group:{
                _id: {
                      year: "$year"             //  year: "$year"
                    , month: "$month"           //, month: "$month"
                    , day: "$day"               //, day: "$day"
                    , hour: "$hour"             //, hour: "$hour"
                    //, minute: "$minute"
                }
                ,key: {$push:{identifier:"$identifier",time:"$time"}}
                ,count: {$sum: 1}
            }}
            ,{$sort:{_id:-1}}
            ,{$project:{
                _id:1
                //,key:1
                ,count:1
            }}
        ], function(err, result) {
            if(err) console.log("err : "+err.message);
            console.log("result : "+util.inspect(result));
            res.render('sys_ALERT_event', {title: 'flow', result: result });
        });
    };
};