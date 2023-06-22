//process.env.[參數]
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

module.exports = {
    mongodb: {
      // host: process.env.HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      // database: process.env.DATABASE
    },

    secret:process.env.MY_SECRET
}