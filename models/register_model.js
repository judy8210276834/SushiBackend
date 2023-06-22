const db = require("../models/connection_db");

module.exports = function register(res, memberData) {

  return new Promise(async (resolve, reject) => {
    const name = memberData.name; //post取資料方式
    const email = memberData.email;
    const password = memberData.password;
    const create_date = memberData.create_date;

    // 檢查資料庫中的資料
    const collection = db.collection("member");
    let result = await collection.findOne({
      email: email,
    });

  
    if (result !== null) {
      // email已經存在
      //   res.redirect("/error?msg=註冊失敗，信箱重複");
      // console.log(result);
      result.status = "註冊失敗,email已經存在";
      reject(result);
      return; //才不會繼續往下跑
    }
    //   將新的會員資料放到資料庫
    result = await collection.insertOne({
      name: name,
      email: email,
      password: password,
      create_date: create_date,
    });
    //   新增成功，導回首頁
    // res.redirect("/");
    result.status = "註冊成功"
    resolve(result);
  });
};
