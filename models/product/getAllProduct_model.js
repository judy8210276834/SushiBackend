const db = require("../connection_db");

module.exports = function getProductData(gid) {
    let result = {};
    return new Promise(async (resolve, reject) => {
        // 檢查資料庫中的資料
        const collection = db.collection("product");
        await collection.find({categary:gid}).toArray().then(
            res =>  resolve(res),
            err => {
                console.log(err);
                result.status="取得全部訂單資料失敗。";
                result.err="伺服器錯誤，請稍後在試!";
                reject(result);
                return;
            },
        );


    })
}