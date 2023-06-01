var member = require('./routes/member.js');
var users = require('./routes/users');

// ---- 基本設定 ----
var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;

// 將路由套用至應用程式
app.use('/', member);
app.use('/users', users);

// ---- 啟動伺服器 ----
app.listen(port);

