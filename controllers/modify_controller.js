const toRegister = require("../models/register_model");
const loginAction = require("../models/login_model");
const Check = require("../sevice/member_check");
const encryption = require('../models/encryption');
const jwt = require('jsonwebtoken');
const config = require('../config/development_config');


check = new Check();

module.exports = class Member {
  postRegister(req, res) {
    // 進行加密
    const password = encryption(String(req.body.password));

    // 獲取client端資料

    const memberData = {
      name: String(req.body.name),
      email: String(req.body.email),
      password: password,
      create_date: onTime()
    };

    const checkEmail = check.checkEmail(String(memberData.email));

    // 不符合email格式
    if (checkEmail === false) {
      res.json({
        result: {
          status: "註冊失敗。",
          err: "請輸入正確的Eamil格式。(如1234@email.com)",
        },
      });
    } else if (checkEmail === true) {
      toRegister(res, memberData).then(
        (result) => {
          // 若寫入成功則回傳
          res.json({
            status: "註冊成功。",
            result: result,
          });
          // res.send('註冊成功。');
        },
        (err) => {
          // 若寫入失敗則回傳;
          res.json({
            result: err,
          });
          // res.send('註冊失敗。');
        }
      );
    }
  }

  postLogin(req, res) {
    // 進行加密
    const password = encryption(String(req.body.password));

    // 獲取client端資料
    const memberData = {
      email: String(req.body.email),
      password: password,
    };

    // loginAction(memberData);

    loginAction(memberData).then(result => {
      // console.log(result);
      if (check.checkNull(result) === true) {
        res.json({
          result: {
            status: "登入失敗。",
            err: "請輸入正確的帳號或密碼。"
          }
        });
      } else if (check.checkNull(result) === false) {
         // 產生token
         const token = jwt.sign({
          algorithm: 'HS256',
          exp: Math.floor(Date.now() / 1000) + (60 * 60), // token一個小時後過期。
          data: result._id
        }, config.secret);
        res.setHeader('token', token);

        res.json({
          result: {
            status: "登入成功。",
            loginMember: "歡迎加入!",
          }
        });
      }
    }).catch(function (err) {
      console.log("Promise Rejected");
      console.log(err);
    });
  }
};

//取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
  const date = new Date();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mi = date.getMinutes();
  const ss = date.getSeconds();

  return [
    date.getFullYear(),
    "-" + (mm > 9 ? "" : "0") + mm,
    "-" + (dd > 9 ? "" : "0") + dd,
    " " + (hh > 9 ? "" : "0") + hh,
    ":" + (mi > 9 ? "" : "0") + mi,
    ":" + (ss > 9 ? "" : "0") + ss,
  ].join("");
};
