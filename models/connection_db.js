// DataBase
const config = require("../config/development_config");

// 建立資料庫連線\
const mongo = require("mongodb");
const uri = `mongodb+srv://${config.mongodb.user}:${config.mongodb.password}@mycluster.yftjrbr.mongodb.net/?retryWrites=true&w=majority`;
const client = new mongo.MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = null;

client.connect();
console.log("連線成功");
db = client.db("member-system");
// 後續的資料庫操作
//client.close(); // 關閉資料庫

module.exports = db;
