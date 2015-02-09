# Syslog0130
syslog0130

### 前置準備

下載Syslog0130資源

```bash 
$ git clone https://github.com/liyuqi/Syslog0130
```


安裝node_module套件

```bash 
$ sudo npm install
```


開啟mongod，預設27017 port

```bash 
$ mongod
```

修改mongodb設定

```bash
$ vi ./setting.js
module.exports = {
  	cookie_secret : 'secret_meteoric',
  	db : 'test',
  	host : ```'192.168.0.190'```,
  	port : 27017
  };
```

### 開始使用SYSLOG CRUD功能

開啟app

```bash
$ node app.js
```

新增Log
![Image text](https://github.com/liyuqi/Syslog0130/blob/master/example/syslog_CRUD_insert.png)

查詢Log
![Image text](https://github.com/liyuqi/Syslog0130/blob/master/example/syslog_CRUD_query.png)

顯示Log
![Image text](https://github.com/liyuqi/Syslog0130/blob/master/example/syslog_CRUD_query_result.png)

最新Log
![Image text](https://github.com/liyuqi/Syslog0130/blob/master/example/syslog_CRUD_show_pagging.png)

設定 Alert
![Image text](https://github.com/liyuqi/Syslog0130/blob/master/example/syslog_ALERT_insert.png)

列表 Alert
![Image text](https://github.com/liyuqi/Syslog0130/blob/master/example/syslog_ALERT_list.png)

顯示Alert
![Image text](https://github.com/liyuqi/Syslog0130/blob/master/example/syslog_ALERT_display.png)