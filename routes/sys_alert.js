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
        var event_field = req.body.field;
        var event_value = req.body.field_value;

        if (event_value.length>0) {
            if (event_field == "time") {
                var reqTime = req.body.field_value || (new Date).getTime();
                var event = {
                    field:event_field,
                    value:reqTime
                    //url_param:'field='+event_field+'&value='+reqTime;
                };
                console.log("events data : " + util.inspect(event));
                collection.insert(event,{safe: true}, function(err, docs){
                    console.log("events data : " + util.inspect(docs));
                    // mongodb.close();
                    res.render('sys_CRUD_insert', { title: 'Create ALERT rule', resp : docs,layout: 'l2'});
                });
            }
            else if (event_field = "identifier") {
                var reqIdentifier = new RegExp('' + req.body.field_value);
                var event = {
                    field: event_field,
                    value:reqIdentifier
                };
                console.log("events data : " + util.inspect(event));
                collection.insert(event,{safe: true}, function(err, docs){
                    console.log("events data : " + util.inspect(docs));
                    // mongodb.close();
                    res.render('sys_CRUD_insert', { title: 'Create ALERT rule', resp : docs,layout: 'l2'});
                });
            }
            else if (event_field ="message"){
                var reqMessage = new RegExp('' + req.body.field_value);
                var event = {
                    field: event_field,
                    value:reqMessage
                };
                console.log("events data : " + util.inspect(event));
                collection.insert(event,{safe: true}, function(err, docs){
                    console.log("events data : " + util.inspect(docs));
                    // mongodb.close();
                    res.render('sys_CRUD_insert', { title: 'Create ALERT rule', resp : docs,layout: 'l2'});
                });
            }
        }else{
            res.redirect('/sys_ALERT_index');
        }
    };
};

exports.sys_ALERT_loglist = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('alerts');

        collection.col.count({},function(err, count) {
            if(err) throw err;
            //console.log(format("count = %s", count));
            res.render('sys_ALERT_query', {title: 'logs', totalcount : count,resp :null,layout: 'l2'});
        });
    };
};

exports.sys_ALERT_query = function(mongodb){
    return function(req, res) {
        //var logmsg = {
        //    message:  new RegExp(req.body.matchmsg.trim())
        //};
        var matchmsg = req.body.matchmsg || '';
        //var message = {$regex:req.body.matchmsg || ''};
        var message = {$regex: new RegExp('.*'+matchmsg)};

        var identifier = req.body.identifier || '';
        var sysid = {$regex: new RegExp(''+identifier)};

        console.log('sysid:'+util.inspect(sysid)+'sysid.length:'+sysid.length);
        var collection = mongodb.get('alerts');
        if (matchmsg.length < 1 && req.body.logid.length < 1 && identifier.length < 1 && req.body.matchdate.length < 1) {
            // console.log("return to loglist");
            res.redirect('/sys_ALERT_query');
        }
        if(matchmsg.length >0){
            collection.find({message:message}/*,{limit : 20}*/,function(e,docs){
                console.log(message+' '+docs.length);
                res.render('sys_ALERT_query', {title: 'logs', resp : docs,layout: 'l2'});
            });
        }
        else if(identifier.length >0){
            collection.find({identifier:sysid}/*,{limit : 20}*/,function(e,docs){
                //console.log("docs data : "+util.inspect(docs));
                console.log(sysid+' '+docs.length);
                res.render('sys_ALERT_query', {title: 'alerts', resp : docs,layout: 'l2'});
            });
        }
        else if(req.body.matchdate.length >0){
            start = new Date(req.body.matchdate.trim());
            if(req.body.matchenddate.trim().length <1)
                end = new Date();
            else end = new Date(req.body.matchenddate.trim());

            collection.find({"time" : {"$gte": start,"$lte":end}},{limit : 20},function(e,docs){
                // console.log("docs data : "+util.inspect(docs));
                res.render('sys_ALERT_query', {title: 'alerts', resp : docs,layout: 'l2'});
            });
        }
        else{
            collection.find({'_id' : req.body.logid},{limit : 20,sort : { timestamp : 1 }},function(err,docs){
                // console.log("docs data : "+util.inspect(docs));
                if(err) {
                    res.redirect('/sys_CRUD_query');
                }
                res.render('sys_ALERT_query', {title: 'alerts', resp : docs,layout: 'l2'});
            });
        }
    };
};

exports.sys_ALERT_count = function (mongodb) {
    return function (req, res) {
        var collection = mongodb.get('alerts');

        collection.count({}, function (err, count) {
            if (err) throw err;
            res.render('sys_ALERT_show', {title: 'alerts', totalcount: count, resp: null, logdetail: null, layout: 'l2'});
        });
    };
};

exports.sys_ALERT_show = function (mongodb) {
    return function (req, res) {
        var collection = mongodb.get('alerts');

        collection.count({}, function (err, count) {
            collection.find({}, {/*limit: 20,*/ sort: {_id: -1}}, function (e, docs) {
                // console.log("docs data : "+util.inspect(docs));
                var docdetail;
                if (docs.length == 1) docdetail = util.inspect(docs);
                res.render('sys_ALERT_show', {
                    title: 'alerts', totalcount: count, resp: docs, logdetail: docdetail, layout: 'l2'
                });
            });
        });
    };
};