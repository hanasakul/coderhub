const crypto = require('crypto');

const md5 = (password)=>{
  const hash = crypto.createHash('md5');
  const encrypted = hash.update(password).digest('hex')

  return encrypted;
}

module.exports = {
  md5
}