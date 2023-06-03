const toRegister = require("../models/register_model");
const Check = require("../sevice/member_check");
check = new Check();

module.exports = class Member {
  postRegister(req, res) {
    // 獲取client端資料
    const memberData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      create_date: onTime,
    };

    const checkEmail = check.checkEmail(memberData.email);

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
