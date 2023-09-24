const productData = require("../../models/product/getAllProduct_model");

module.exports = class GetProduct {
  // 取得全部產品資料
  getAllProduct(req, res) {
    const gid = String(req.query.gid);

    productData(gid)
      .then((result) => {
        res.json({
          result: result,
        });
      })
      .catch(function (err) {
        console.log("Promise Rejected");
        console.log(err);
      });
  }
};
