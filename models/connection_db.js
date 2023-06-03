// DataBase
const config = require('../config/development_config');
// const mysqlt = require("mysql");

// const connection = mysqlt.createConnection({
//   host: config.mysql.host,
//   user: config.mysql.user,
//   password: config.mysql.password,
//   database: config.mysql.database
// });

// 建立資料庫連線\
const mongo = require("mongodb");
const uri =
  `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@mycluster.yftjrbr.mongodb.net/?retryWrites=true&w=majority`;
const client = new mongo.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = null;
async function initDB() {
  await client.connect();
  console.log("連線成功");
  db = client.db("member-system");
  // 後續的資料庫操作
  //client.close(); // 關閉資料庫
}
initDB();

// 建立網站伺服器基礎設定
const express = require("express");
const app = express();
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