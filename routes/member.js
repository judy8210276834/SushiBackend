var express = require('express');
var router = express.Router();
var initDB = require('../models/connection_db');

let db = null;
db = initDB;

const MenberModifyMethod = require('../controllers/modify_controller');
const { Long } = require('mongodb');


menberModifyMethod = new MenberModifyMethod();

router.post('/register', function(req, res) {
  menberModifyMethod.postRegister(req, res);
  // res.send('ok1');
});

module.exports = router;