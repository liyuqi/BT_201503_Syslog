/**
 * Created by Yuqi on 2015/1/21.
 */
//mongodbDemo
// var mongodb = require('../models/db.js');
var util = require('util');

exports.index = function(req, res){
    res.render('sys_ALERT_insert', { title: 'Create ALERT', resp : false,layout: 'l2'});
};

exports.sys_ALERT_insert = function(mongodb){
    return function(req, res) {

        var collection = mongodb.get('alerts');

        var identifier = req.body.identifier || null;
        var matchmsg = req.body.matchmsg || null;
        //var sysid = {$regex: new RegExp(identifier)};
        //var message = {$regex: new RegExp(matchmsg)};
        //
        //var event = {
        //    event: {
        //        //time_interval:{$gte:start_time,$lt:end_time}
        //        identifier: sysid,
        //        message: message
        //    }
        //};
        //console.log('event:' + util.inspect(event) + 'event.length:' + event.length);

        if (!matchmsg && !identifier) {
                console.log('!matchmsg && !identifier');
                res.redirect('/sys_ALERT_insert');
        }
        else if(identifier){

            //var sysid = {$regex: new RegExp(''+identifier)};
            var sysid =  new RegExp(''+identifier);
            console.log('sysid:\n'+ util.inspect(sysid));
            var event = { event: {identifier: sysid}};
            collection.insert(event,{safe: true}, function(err, events){
                console.log("event  data = " + util.inspect(event));
                console.log("events data = " + util.inspect(events));
                res.render('sys_ALERT_insert', { title: 'Create log', resp : events,layout: 'l2'});
            });
        }
        else if(matchmsg){

            //var message = {$regex: new RegExp(''+matchmsg)};
            var message = new RegExp(''+matchmsg);
            console.log('message:\n'+ util.inspect(message));
            var event = { event:  {message:message} };
            collection.insert(event,{safe: true}, function(err, events){
                console.log("event  data = " + util.inspect(event) + ',' + JSON.stringify(event));
                console.log("events data = " + util.inspect(events));
                res.render('sys_ALERT_insert', { title: 'Create log', resp : events,layout: 'l2'});
                //res.json('sys_ALERT_insert', { title: 'Create log', resp : JSON.stringify((events),layout: 'l2'});
            });
        }
        else if(identifier.length > 0 && matchmsg.length > 0){
            console.log('matchmsg>0 && identifier>0:\n'
                        + util.inspect(identifier)
                        + ' ' + util.inspect(matchmsg));
            var sysid = new RegExp(''+identifier);
            var message = new RegExp(''+matchmsg);
            var event = {  event: {
                    identifier: new RegExp(''+identifier),
                    message: new RegExp(''+matchmsg)
                }};
            collection.insert(event,{safe: true}, function(err, events){
                console.log("events data : " + util.inspect(events));
                res.render('sys_ALERT_insert', { title: 'Create log', resp :events,layout: 'l2'});
            });
        }
        else{
            console.log('redirect');
            res.redirect('/sys_ALERT_insert');
        }
    };
};

exports.sys_ALERT_count = function (mongodb) {
    return function (req, res) {
        var collection = mongodb.get('alerts');

        collection.count({}, function (err, count) {
            if (err) throw err;
            res.render('sys_ALERT_list', {title: 'alerts', totalcount: count, resp: null, logdetail: null, layout: 'l2'});
        });
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
                var test = util.inspect(docs);
                res.render('sys_ALERT_list', {
                    title: 'alerts', totalcount: count, resp: docs, logdetail: docdetail, layout: 'l2'
                });
            });
        });
    };
};

exports.sys_ALERT_loglist = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('alerts');
        //var collectionLog = mongodb.get('logs');
        collection.col.count({},function(err, count) {
            if(err) throw err;
            collection.find({},function(err, docs){
                //console.log(format("count = %s", count));
                res.render('sys_ALERT_list', {title: 'alert count', totalcount : count,resp :docs,layout: 'l2'});
            })

        });
    };
};

exports.sys_ALERT_query = function(mongodb){
    return function(req, res) {
        var event = req.query.event || null;

        //console.log('sysid:'+util.inspect(sysid)+'sysid.length:'+sysid.length);
        var collectionLog = mongodb.get('logs');
        //var collection = mongodb.get('alerts');
        if (event.length < 1) {
            res.redirect('/sys_ALERT_display');
        }
        if(event.length >0){
            collectionLog.count(JSON.parse(event),function(err,count){
                collectionLog.find(JSON.parse(event),{limit : 20},function(err,docs){
                    console.log(util.inspect(event) + ' '+docs.length);
                    res.render('sys_ALERT_display', {title: 'alert display',totalcount : count, resp : docs,layout: 'l2'});
                });
            })
        }
        else{
            res.redirect('/sys_ALERT_display');
        }
    };
};