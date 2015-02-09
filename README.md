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
$ vi ./setting.js    # 替換連線DB
```

> module.exports = {

>  	cookie_secret : 'secret_meteoric',

>  	db : '`test`',

>  	host : '`192.168.0.190`',

>  	port : `27017`

>  };

```bash
$ vi ./app.js       # 替換連線DB
```

```js
var dbfluentd = monk('`192.168.0.190/test`');
```

<pre style="background:#fff;color:#000"><span style="color:#ff5600">var</span> dbfluentd <span style="color:#ff5600">=</span> monk(<span style="color:#00a33f">'`192.168.0.190/test`'</span>);
</pre>

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