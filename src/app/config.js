const fs = require('fs');
const path = require('path');
require('dotenv').config();;

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASSWORD,
  MYSQL_DATABASE
} = process.env;

module.exports.PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname,'key/private.key'));
module.exports.PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname,'key/public.key'));