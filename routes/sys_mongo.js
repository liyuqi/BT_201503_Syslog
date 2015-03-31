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
var _max_pageunit=50;

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
        if(req.body.device_name){
            log.device_name = req.body.device_name.trim();
        }
        if(req.body.identifier){
            log.identifier = req.body.identifier.trim();
        }
        else if(req.body.facility || req.body.severity || req.body.mnemonic){
            log.identifier = '';
            if(req.body.facility){
                log.identifier += req.body.facility.trim()+'-';
            }
            if(req.body.severity){
                log.identifier += req.body.severity.trim()+'-';
            }
            if(req.body.mnemonic){
                log.identifier += req.body.mnemonic.trim();
            }
            //log.identifier = req.body.identifier.trim();
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
        if(req.body.message){
            log.message = req.body.message;
        }
        if(req.body.enrich){
            log.enrich = req.body.enrich.trim();
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

exports.sys_CRUD_query_short = function(mongodb){
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
            query.device_name = req.body.device_name.trim(); //{$regex: new RegExp('.*'+req.body.device_name.trim())};
        }
        //if(req.body.identifier){
        //    query.identifier = new RegExp(req.body.identifier.trim()); //{$regex: new RegExp('.*'+req.body.identifier.trim())};
        //}
        if(req.body.facility){
            query.facility = req.body.facility.trim();//{$regex: new RegExp('.*'+req.body.facility.trim())};
        }
        if(req.body.severity){
            query.severity = req.body.severity.trim(); //{$regex: new RegExp('.*'+req.body.severity.trim())};
        }
        if(req.body.mnemonic){
            query.mnemonic = req.body.mnemonic.trim(); //{$regex: new RegExp('.*'+req.body.mnemonic.trim())};
        }

        if(req.body.message){
            query.message = new RegExp(req.body.message.trim()); //{$regex: new RegExp('.*'+req.body.matchmsg.trim())};
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
            query.device_name = req.body.device_name.trim(); //{$regex: new RegExp('.*'+req.body.device_name.trim())};
        }
        //if(req.body.identifier){
        //    query.identifier = new RegExp(req.body.identifier.trim()); //{$regex: new RegExp('.*'+req.body.identifier.trim())};
        //}
        if(req.body.facility){
            query.facility = req.body.facility.trim();//{$regex: new RegExp('.*'+req.body.facility.trim())};
        }
        if(req.body.severity){
            query.severity = req.body.severity.trim(); //{$regex: new RegExp('.*'+req.body.severity.trim())};
        }
        if(req.body.mnemonic){
            query.mnemonic = req.body.mnemonic.trim(); //{$regex: new RegExp('.*'+req.body.mnemonic.trim())};
        }

        if(req.body.message){
            query.message = new RegExp(req.body.message.trim()); //{$regex: new RegExp('.*'+req.body.matchmsg.trim())};
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
        collection.count({},function(err,db_count){
            collection.count(query, function (err, query_count) {
                collection.find(query, {limit: _max_pageunit}, function (err, docs) {
                    if (docs.length) console.log('docs.length: ' + docs.length);
                    if (err) res.redirect('/sys_CRUD_query');
                    res.render('sys_CRUD_display_query', {
                            title: 'query log',
                            db_count:db_count,
                            totalcount:query_count,
                            //page_count:docs.length,
                            resp: docs
                        }
                    );
                });
            });
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

exports.cdr_CRUD_insert = function(mongodb){
    return function(req, res) {
        //fields
        var log = {
            //"_id" : ObjectId("5513e647e4b06c76ad746f5f"),
            "acceptable_channel_codings_01" : "1",
            "acceptable_channel_codings_02" : "1",
            "acceptable_channel_codings_03" : "1",
            "acceptable_channel_codings_04" : "1",
            "acceptable_channel_codings_05" : "1",
            "acceptable_channel_codings_06" : "1",
            "acceptable_channel_codings_07" : "1",
            "acceptable_channel_codings_08" : "1",
            "add_routing_category" : "0",
            "answer_time" : new Date(),
            "aoc_indicator" : "0",
            "b_idle_time" : new Date(),
            "basic_service_code" : "11",
            "basic_service_type" : "00",
            "call_reference" : "",
            "call_reference_comp" : "4143",
            "call_reference_focus" : "01B8",
            "call_reference_process" : "0C",
            "call_reference_time" : new Date(),
            "call_type" : "03",
            "call_state" : "",
            "called_category" : "FF",
            "called_cell_band" : "",
            "called_charging_area" : "FFFF",
            "called_imei" : "",
            "called_imsi" : "",
            "called_modify_parameters_01" : "",
            "called_modify_parameters_02" : "",
            "called_modify_parameters_03" : "",
            "called_modify_parameters_04" : "",
            "called_modify_parameters_05" : "",
            "called_modify_parameters_06" : "",
            "called_modify_parameters_07" : "",
            "called_ms_classmark" : "FF",
            "called_msrn" : "",
            "called_msrn_npi" : "FF",
            "called_msrn_ton" : "FF",
            "called_number" : "1417927621231",
            "called_number_npi" : "05",
            "called_number_ton" : "06",
            "called_subs_first_ci" : "65535",
            "called_subs_first_lac" : "65535",
            "called_subs_first_mcc" : "",
            "called_subs_first_mnc" : "",
            "called_subs_last_ci" : "65535",
            "called_subs_last_ex_id" : "",
            "called_subs_last_ex_id_ton" : "FF",
            "called_subs_last_lac" : "65535",
            "called_subs_last_mcc" : "",
            "called_subs_last_mnc" : "",
            "calling_category" : "00",
            "calling_cell_band" : "03",
            "calling_charging_area" : "FFFF",
            "calling_imei" : "012249004738710",
            "calling_imsi" : "466974106619655",
            "calling_modify_parameters_01" : "",
            "calling_modify_parameters_02" : "0000",
            "calling_modify_parameters_03" : "0000",
            "calling_modify_parameters_04" : "0000",
            "calling_modify_parameters_05" : "0000",
            "calling_modify_parameters_06" : "0000",
            "calling_modify_parameters_07" : "0000",
            "calling_ms_classmark" : "07",
            "calling_number" : "886972266743",
            "calling_number_npi" : "05",
            "calling_number_ton" : "05",
            "calling_subs_first_ci" : "10159",
            "calling_subs_first_lac" : "11114",
            "calling_subs_first_mcc" : "466",
            "calling_subs_first_mnc" : "97",
            "calling_subs_last_ci" : "46144",
            "calling_subs_last_ex_id" : "886935420431",
            "calling_subs_last_ex_id_ton" : "05",
            "calling_subs_last_lac" : "11114",
            "calling_subs_last_mcc" : "466",
            "calling_subs_last_mnc" : "97",
            "camel_call_reference" : "401C41431B6B0000",
            "camel_exchange_id" : "886935420431",
            "camel_exchange_id_ton" : "05",
            "carrier_selection" : "04",
            "cause_for_termination" : "00000000",
            "cf_information" : "",
            "channel_rate_indicator_01" : "3",
            "channel_rate_indicator_02" : "0",
            "charging_end_time" : new Date(),
            "charging_start_time" : new Date(),
            "check_sum" : "DE0F",
            "connected_to_number" : "1417927621231",
            "connected_to_number_npi" : "05",
            "connected_to_number_ton" : "06",
            "cug_information" : "00",
            "cug_interlock_01" : "",
            "cug_interlock_02" : "FFFF",
            "cug_outgoing_access" : "FF",
            "data_volume" : "0",
            "dialled_digits" : "0927621231",
            "dialled_digits_npi" : "05",
            "dialled_digits_ton" : "04",
            "dtmf_indicator" : "0",
            "emergency_call_category_01" : "0",
            "emergency_call_category_02" : "0",
            "emergency_call_category_03" : "0",
            "emergency_call_category_04" : "0",
            "emergency_call_category_05" : "0",
            "exchange_id" : "886935420431",
            "facility_usage_01" : "0",
            "facility_usage_02" : "0",
            "facility_usage_03" : "0",
            "facility_usage_04" : "0",
            "facility_usage_05" : "0",
            "facility_usage_06" : "0",
            "facility_usage_07" : "0",
            "facility_usage_08" : "0",
            "facility_usage_09" : "0",
            "facility_usage_10" : "0",
            "facility_usage_11" : "0",
            "facility_usage_12" : "0",
            "facility_usage_13" : "0",
            "facility_usage_14" : "0",
            "facility_usage_15" : "1",
            "facility_usage_16" : "0",
            "facility_usage_17" : "0",
            "facility_usage_18" : "0",
            "facility_usage_19" : "0",
            "facility_usage_20" : "0",
            "facility_usage_21" : "0",
            "facility_usage_22" : "0",
            "facility_usage_23" : "0",
            "facility_usage_24" : "0",
            "facility_usage_25" : "0",
            "facility_usage_26" : "0",
            "facility_usage_27" : "0",
            "forwarded_to_number" : "",
            "forwarded_to_number_ton" : "",
            "hot_billing_record_number" : "0",
            "in_bnc_connection_type" : "",
            "in_channel_allocated_time" : new Date(),
            "in_circuit" : "",
            "in_circuit_group" : "",
            "inside_control_plane_index" : "",
            "inside_user_plane_index" : "",
            "intermediate_charging_ind" : "00",
            "intermediate_chrg_cause_01" : "0",
            "intermediate_chrg_cause_02" : "0",
            "intermediate_chrg_cause_03" : "0",
            "intermediate_chrg_cause_04" : "0",
            "intermediate_chrg_cause_05" : "0",
            "intermediate_chrg_cause_06" : "0",
            "intermediate_chrg_cause_07" : "0",
            "intermediate_chrg_cause_08" : "0",
            "intermediate_record_number" : "0",
            "leg_call_reference" : "",
            "leg_call_reference_comp" : "4143",
            "leg_call_reference_focus" : "4143",
            "leg_call_reference_process" : "4143",
            "loc_routing_number" : "",
            "loc_routing_number_ton" : "FF",
            "ms_classmark3" : "10",
            "non_transparency_indicator" : "FF",
            "npdb_query_status" : "00",
            "number_of_all_in_records" : "1",
            "number_of_ss_records" : "0",
            "orig_calling_number" : "",
            "orig_calling_number_npi" : "",
            "orig_calling_number_ton" : "",
            "orig_dialling_class" : "",
            "orig_mcz_chrg_type_01" : "0",
            "orig_mcz_chrg_type_02" : "0",
            "orig_mcz_chrg_type_03" : "0",
            "orig_mcz_chrg_type_04" : "0",
            "orig_mcz_chrg_type_05" : "0",
            "orig_mcz_duration" : 27,
            "orig_mcz_duration_ten_ms" : 27.170000076293945,
            "orig_mcz_modify_direction" : "01",
            "orig_mcz_modify_percent" : "0",
            "orig_mcz_pulses" : "0",
            "orig_mcz_tariff_class" : "000000",
            "out_bnc_connection_type" : "08",
            "out_channel_allocated_time" : "",
            "out_circuit" : "455",
            "out_circuit_group" : "2500",
            "outside_control_plane_index" : "0",
            "outside_user_plane_index" : "0",
            "pic" : "FFFF",
            "pni" : "FFFFFF",
            "radio_network_type" : "02",
            "rate_adaption" : "FF",
            "record_length" : "436",
            "record_number" : "29113385",
            "record_status" : "00",
            "record_type" : "1",
            "redirected_indicator" : "00",
            "redirecting_number" : "",
            "redirecting_number_npi" : "",
            "redirecting_number_ton" : "",
            "regional_subs_indicator" : "FF",
            "regional_subs_location_type" : "FF",
            "req_air_interface_user_rate" : "FF",
            "req_fixed_nw_user_rate" : "FF",
            "req_number_of_channels" : "FF",
            "req_other_modem_type" : "FF",
            "req_user_initiated_mod_ind" : "FF",
            "routing_category" : "0",
            "routing_info" : "",
            "set_up_start_time" : new Date(),
            "speech_version" : "0",
            "start_time" : "",
            "stream_identifier" : "00",
            "term_mcz_chrg_type_01" : "",
            "term_mcz_chrg_type_02" : "",
            "term_mcz_chrg_type_03" : "",
            "term_mcz_chrg_type_04" : "",
            "term_mcz_chrg_type_05" : "",
            "term_mcz_duration" : null,
            "term_mcz_duration_ten_ms" : null,
            "term_mcz_modify_direction" : "",
            "term_mcz_modify_percent" : "",
            "term_mcz_pulses" : "",
            "term_mcz_tariff_class" : "",
            "tns_carrier_code" : "FFFF",
            "tns_circuit_code" : "00",
            "used_air_interface_user_rate" : "00",
            "used_channel_coding" : "FF",
            "used_fixed_nw_user_rate" : "FF",
            "used_number_of_channels" : "00",
            "used_other_modem_type" : "FF",
            "date_time" : new Date(),
            "short_called_number" : "",
            "reversed_called_number" : "",
            "short_calling_number" : "",
            "reversed_calling_number" : "",
            "short_connected_to_number" : "",
            "reversed_connected_to_number" : "",
            "short_orig_calling_number" : "",
            "reversed_orig_calling_number" : "",
            "short_redirecting_number" : "",
            "reversed_redirecting_number" : "",
            "release_time" : ""
        };

        //insert
        var collection = mongodb.get('cep3g');
        collection.insert(log,{safe: true}, function(err, docs){
            console.log("insert log : " + util.inspect(docs.length));
            res.render('cdr_CRUD_insert', {title: 'insert 3g', resp: docs, layout:null});
        });
    };
};