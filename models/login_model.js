const db = require("../models/connection_db");

module.exports = function memberLogin(memberData) {
    let result = {};
    return new Promise(async (resolve, reject) => {

        const email = memberData.email;
        const password = memberData.password;
        console.log(email);
        console.log(password);

        // 找會員帳號、密碼
        const collection = db.collection("member");
        await collection.findOne({
            $and: [{ email: email }, { password: password }]
        }).then(
            res => resolve(res),
            err => {
                result.status="登入失敗";
                result.err="伺服器錯誤，請稍後在試!";
                reject(result);
            },
        );


    })
}