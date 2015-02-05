/**
 * Created by Yuqi on 2015/1/21.
 */
//mongodbDemo
// var mongodb = require('../models/db.js');
var util = require('util');

exports.index = function(req, res){
    res.render('sys_CRUD_insert', { title: 'Create log', resp : false,layout: 'l2'});
};

exports.sys_CRUD_insert = function(mongodb){
    return function(req, res) {
        //console.log(req.body.timestamp);
        var reqTimestamp = req.body.timestamp || (new Date).getTime();

        var logmsg = {
            time : reqTimestamp,
            identifier: req.body.identifier || '',
            message: req.body.msg || ''
        };
        var collection = mongodb.get('logs');
        collection.insert(logmsg,{safe: true}, function(err, events){
            console.log("events data : " + util.inspect(events));
            // mongodb.close();
            res.render('sys_CRUD_insert', { title: 'Create log', resp : events,layout: 'l2'});
        });
    };
};

exports.sys_CRUD_loglist = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('logs');

        collection.col.count({},function(err, count) {
            if(err) throw err;
            //console.log(format("count = %s", count));
            res.render('sys_CRUD_query', {title: 'logs', totalcount : count,resp :null,layout: 'l2'});
        });
    };
};

exports.sys_CRUD_query = function(mongodb){
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
        var collection = mongodb.get('logs');
        if (matchmsg.length < 1 && req.body.logid.length < 1 && identifier.length < 1 && req.body.matchdate.length < 1) {
            // console.log("return to loglist");
            res.redirect('/sys_CRUD_query');
        }
        if(matchmsg.length >0){
            collection.find({message:message}/*,{limit : 20}*/,function(e,docs){
                console.log(message+' '+docs.length);
                //res.render('sys_CRUD_query', {title: 'logs', resp : docs,layout: 'l2'});
                res.render('sys_CRUD_display', {title: 'logs', totalcount: docs.length, resp: docs, layout: 'l2'});
            });
        }
        else if(identifier.length >0){
            collection.find({identifier:sysid}/*,{limit : 20}*/,function(e,docs){
                //console.log("docs data : "+util.inspect(docs));
                console.log(sysid+' '+docs.length);
                res.render('sys_CRUD_display', {title: 'logs', totalcount: docs.length, resp : docs,layout: 'l2'});
            });
        }
        else if(req.body.matchdate.length >0){
            start = new Date(req.body.matchdate.trim());
            if(req.body.matchenddate.trim().length <1)
                end = new Date();
            else end = new Date(req.body.matchenddate.trim());

            collection.find({"time" : {"$gte": start,"$lte":end}},{limit : 20},function(e,docs){
                // console.log("docs data : "+util.inspect(docs));
                res.render('sys_CRUD_display', {title: 'logs', totalcount: docs.length, resp : docs,layout: 'l2'});
            });
        }
        else{
            collection.find({'_id' : req.body.logid},{limit : 20,sort : { timestamp : 1 }},function(err,docs){
                // console.log("docs data : "+util.inspect(docs));
                if(err) {
                    res.redirect('/sys_CRUD_query');
                }
                res.render('sys_CRUD_display', {title: 'logs', totalcount: docs.length, resp : docs,layout: 'l2'});
            });
        }
    };
};

exports.sys_CRUD_count = function (mongodb) {
    return function (req, res) {
        var collection = mongodb.get('logs');

        collection.count({}, function (err, count) {
            if (err) throw err;
            res.render('sys_CRUD_show', {title: 'logs', totalcount: count, resp: null, logdetail: null, layout: 'l2'});
        });
    };
};

exports.sys_CRUD_show = function (mongodb) {
    return function (req, res) {
        var collection = mongodb.get('logs');

        collection.count({}, function (err, count) {
            collection.find({}, {limit: 20, sort: {_id: -1}}, function (e, docs) {
                // console.log("docs data : "+util.inspect(docs));
                var docdetail;
                if (docs.length == 1) docdetail = util.inspect(docs);
                res.render('sys_CRUD_show', {
                    title: 'logs', totalcount: count, resp: docs, logdetail: docdetail, layout: 'l2'
                });
            });
        });
    };
};

//exports.sys_CRUD_queryNoRegEx = function(mongodb){
//    return function(req, res) {
//        //var ipcond = req.body.hostip;
//        var sysmsg = req.body.matchmsg || '';
//
//        var collection = mongodb.get('events');
//        if(sysmsg.length <1){
//            console.log("redirect...");
//            res.redirect( '/sys_CRUD_show' );
//        }
//        if(sysmsg.length >0){
//            collection.find({/*"message":sysmsg*/},{limit : 20},function(e,docs){
//                // console.log("docs data : "+util.inspect(docs));
//                var docdetail;
//                if(docs.length==1) docdetail = util.inspect(docs);
//                res.render('sys_CRUD_show', {title: 'logs', resp : docs, logdetail : docdetail,layout: 'l2'});
//            });
//        }
//    };
//};