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
var _max_pageunit=500;

exports.index = function(req, res){
    res.render('sys_CRUD_insert', { title: 'insert log', resp : false});
};

exports.sys_CRUD_insert = function(mongodb){
    return function(req, res) {
        //fields
        var log = {};
        if(req.body.timestamp){
            if(isNaN((new Date(req.body.timestamp).getTime()))){
                console.log((new Date(req.body.timestamp).getTime()));
                log.TIMESTAMP = new Date();
                log.time = new Date();
            }else{
                console.log((new Date(req.body.timestamp).getTime()));
                log.TIMESTAMP = new Date(req.body.timestamp);
                log.time = new Date(req.body.timestamp);
            }
        }else{
            log.TIMESTAMP = new Date();
            log.time = new Date();
        }
        if(req.body.identifier){
            log.identifier = req.body.identifier.trim();
        }
        if(req.body.facility){
            log.facility = req.body.facility.trim();
        }
        if(req.body.severity){
            log.severity = req.body.severity.trim();
        }
        if(req.body.mnemonic){
            log.mnemonic = req.body.mnemonic.trim();
        }
        if(req.body.enrich){
            log.enrich = req.body.enrich.trim();
        }
        if(req.body.message){
            log.message = req.body.message;
        }

        //insert
        var collection = mongodb.get('logs');
        collection.insert(log,{safe: true}, function(err, docs){
            console.log("insert log : " + util.inspect(docs));
            res.render('sys_CRUD_insert', {title: 'insert log', resp: docs});
        });
    };
};

exports.sys_CRUD_loglist = function(mongodb){
    return function(req, res) {
        var collection = mongodb.get('logs');
        collection.col.count({},function(err, count) {
            if(err) res.redirect('sys_CRUD_query');
            //console.log(format("count = %s", count));
            res.render('sys_CRUD_query', {title: 'show logs', totalcount : count,resp :null});
        });
    };
};

exports.sys_CRUD_query = function(mongodb){
    return function(req, res) {

        //field input
        var query = {};

        if(req.body.matchdate){
            if(req.body.matchenddate){
                query.time = {$gte:(new Date(req.body.matchdate)), $lt: (new Date(req.body.matchenddate))};
            }else{
                query.time = {$gte:(new Date(req.body.matchdate))};
            }
        }
        if(req.body.matchenddate){
            if(req.body.matchdate){
                query.time = {$gte:new Date(req.body.matchdate), $lt: new Date(req.body.matchenddate)};
            }else{
                query.time = {$lt :new Date(req.body.matchenddate)}
            }
        }
        if(req.body.device_name){
            query.device_name = req.body.device_name.trim()//{$regex: new RegExp('.*'+req.body.device_name.trim())};
        }
        if(req.body.identifier){
            query.identifier = req.body.identifier.trim() //{$regex: new RegExp('.*'+req.body.identifier.trim())};
        }
        if(req.body.facility){
            query.facility = req.body.facility.trim()//{$regex: new RegExp('.*'+req.body.facility.trim())};
        }
        if(req.body.severity){
            query.severity = req.body.severity.trim() //{$regex: new RegExp('.*'+req.body.severity.trim())};
        }
        if(req.body.mnemonic){
            query.mnemonic = req.body.mnemonic.trim() //{$regex: new RegExp('.*'+req.body.mnemonic.trim())};
        }

        if(req.body.message){
            query.message = new RegExp(req.body.message.trim());//{$regex: new RegExp('.*'+req.body.matchmsg.trim())};
            console.log(req.body.message);
        }
        if(req.body.enrich){
            query.enrich = req.body.enrich.trim();
        }
        if(req.body.logid){
            query._id = req.body.logid;
        }
        console.log(query);

        var keys = [];
        for(var k in query) keys.push(k);

        if(keys.length==0)
            res.redirect('/sys_CRUD_query');
        //query
        var collection = mongodb.get('logs');
        collection.find(query ,{limit : _max_pageunit},function(err,docs){
            if(docs.length) console.log('docs.length: '+docs.length);
            if(err) res.redirect('/sys_CRUD_query');
            res.render('sys_CRUD_display_query', {title: 'query log', totalcount: docs.length, resp: docs});
        });
    };
};

exports.sys_CRUD_count = function (mongodb) {
    return function (req, res) {
        //var page = req.query.p ? parseInt(req.query.p) : 1;
        var collection = mongodb.get('logs');
        collection.count({},function(err,count){
            collection.find({}, {limit : _pageunit,sort : { time : -1, _id:-1}} , function (err, docs) {
                    if (err) res.redirect('sys_CRUD_show');
                    res.render('sys_CRUD_show', {
                        title: 'show logs2',
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
                {limit : 50,sort : { time : -1, _id:-1 }}, function (e, docs) {
                    // console.log("docs data : "+util.inspect(docs));
                    var docdetail;
                    if (docs.length == 1) docdetail = util.inspect(docs);
                    res.render('sys_CRUD_show', {
                        title: 'show logs3',
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
                {skip : (page - 1) * _pageunit, limit :  _pageunit, sort : { time : -1, _id:-1 }}, function (e, docs) {
                // console.log("docs data : "+util.inspect(docs));
                var docdetail;
                if (docs.length == 1) docdetail = util.inspect(docs);
                res.render('sys_CRUD_show', {
                    title: 'log page',
                    totalcount: count,
                    resp: docs,
                    logdetail: docdetail,
                    page: page,
                    pageTotal: Math.ceil(docs.length / _pageunit),
                    isFirstPage: (page - 1) == 0,
                    isLastPage: ((page - 1) * _pageunit + docs.length) == docs.length
                });
            });
        });
    };
};