var member = require('./routes/member.js');
var users = require('./routes/users');
var initDB = require('./models/connection_db.js');

initDB;

// ---- 基本設定 ----
var express = require('express');
var app     = express();
var port    = process.env.PORT || 8080;

// 建立網站伺服器基礎設定
const session = require("express-session");
app.use(
  session({
    secret: "anything",
    resave: false,
    saveUninitialized: true,
  })
);
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public")); //處理靜態檔案
app.use(express.urlencoded({ extended: true })); //處理post傳遞進來的參數

// 將路由套用至應用程式
app.use('/', member);
app.use('/users', users);

// ---- 啟動伺服器 ----
app.listen(port);

