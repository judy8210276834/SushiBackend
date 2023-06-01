// DataBase
// const config = require('../config/development_config');
// const mysqlt = require("mysql");

// const connection = mysqlt.createConnection({
//   host: config.mysql.host,
//   user: config.mysql.user,
//   password: config.mysql.password,
//   database: config.mysql.database
// });

const mongo=require("mongodb");
const uri="資料庫連線網址";
const client=new mongo.MongoClient(uri, {useNewUrlParser:true, useUnifiedTopology:true});
let db=null;
async function initDB(){
	await client.connect();
	console.log("連線成功");
	db=client.db("資料庫名稱");
	// 後續的資料庫操作
	client.close(); // 關閉資料庫
}
initDB();