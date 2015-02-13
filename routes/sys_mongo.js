/*** Created by Yuqi on 2015/1/21.
 * > db.logs.findOne()
 {
         "_id" : ObjectId("54d966730778511cff000009"),
         "identifier" : "%PIX-6-302005",
         "message" : "Built UDP connection for faddr 198.207.223.240/53337 gaddr 10.0.0.187/53 laddr 192.168.0.2/53",
         "TIMESTAMP" : "2015-02-10T10:01:23+08:00",             //寫入時間
         "time" : ISODate("2004-03-29T01:54:18Z")               //syslog時間
 }
 */
// var mongodb = require('../models/db.js');
var util = require('util');
var _pageunit=50;

exports.index = function(req, res){
    res.render('sys_CRUD_insert', { title: 'Create log', resp : false});
};

exports.sys_CRUD_insert = function(mongodb){
    return function(req, res) {
        //console.log(req.body.timestamp);
        var reqTimestamp = req.body.timestamp || new Date().toISOString();
        //console.log(reqTimestamp);
        var logmsg = {
            TIMESTAMP : new Date(),
            time : new Date(reqTimestamp),
            identifier: req.body.identifier || '',
            message: req.body.msg || ''
        };
        var collection = mongodb.get('logs');
        collection.insert(logmsg,{safe: true}, function(err, events){
            console.log("events data : " + util.inspect(events));

            res.render('sys_CRUD_insert', { title: 'Create log', resp : events});
        });
    };
};

exports.sys_CRUD_loglist = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('logs');

        collection.col.count({},function(err, count) {
            if(err) throw err;
            //console.log(format("count = %s", count));
            res.render('sys_CRUD_query', {title: 'logs', totalcount : count,resp :null});
        });
    };
};

exports.sys_CRUD_query = function(mongodb){
    return function(req, res) {
        var query = {};
        var collection = mongodb.get('logs');
        //field input
        if(req.body.matchdate){
            if(req.body.matchenddate){
                query.time = {$gte:(new Date(req.body.matchdate/*.trim().toISOString()*/)), $lt: (new Date(req.body.matchenddate/*.trim().toISOString()*/))};
            }else{
                query.time = {$gte:(new Date(req.body.matchdate/*.trim().toISOString()*/))};
            }
        }
        if(req.body.matchenddate){
            if(req.body.matchdate){
                query.time = {$gte:new Date(req.body.matchdate.trim().toISOString()), $lt: new Date(req.body.matchenddate.trim().toISOString())};
            }else{
                query.time = {$lt :new Date(req.body.matchenddate.trim().toISOString())}
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
            res.render('sys_CRUD_display_query', {title: 'logs', totalcount: docs.length, resp: docs});
        });
    };
};

exports.sys_CRUD_count = function (mongodb) {
    return function (req, res) {
        //var page = req.query.p ? parseInt(req.query.p) : 1;
        var collection = mongodb.get('logs');
        collection.count({},function(err,count){
            collection.find({}, {limit : _pageunit,sort : { time : -1 }} , function (err, docs) {
                    if (err) throw err;
                    res.render('sys_CRUD_show', {
                        title: 'logs',
                        totalcount: count,
                        resp: docs
                    });
                });
        });
    };
};

exports.sys_CRUD_show = function (mongodb) {
    return function (req, res) {

        var collection = mongodb.get('logs');

        collection.count({}, function (err, count) {
            collection.find({}, //{/*limit: 20,*/ sort: {_id: -1}}, function (e, docs) {
                {limit : 50,sort : { timestamp : -1 }}, function (e, docs) {
                    // console.log("docs data : "+util.inspect(docs));
                    var docdetail;
                    if (docs.length == 1) docdetail = util.inspect(docs);
                    res.render('sys_CRUD_show', {
                        title: 'logs',
                        totalcount: count,
                        resp: docs,
                        logdetail: docdetail
                    });
                });
        });
    };
};

exports.sys_CRUD_show_pagging = function (mongodb) {
    return function (req, res) {
        var page = req.query.p ? parseInt(req.query.p) : 1;

        var collection = mongodb.get('logs');

        collection.count({}, function (err, count) {
            collection.find({}, //{/*limit: 20,*/ sort: {_id: -1}}, function (e, docs) {
                {skip : (page - 1) * 20,limit : 20,sort : { timestamp : -1 }}, function (e, docs) {
                // console.log("docs data : "+util.inspect(docs));
                var docdetail;
                if (docs.length == 1) docdetail = util.inspect(docs);
                res.render('sys_CRUD_show', {
                    title: 'logs',
                    totalcount: count,
                    resp: docs,
                    logdetail: docdetail,
                    page: page,
                    pageTotal: Math.ceil(docs.length / 20),
                    isFirstPage: (page - 1) == 0,
                    isLastPage: ((page - 1) * 20 + docs.length) == docs.length
                });
            });
        });
    };
};

//sys_CRUD_timeConverter = function (mongodb){
//    var collection = mongodb.get('logs');
//    collection.update({})
//}