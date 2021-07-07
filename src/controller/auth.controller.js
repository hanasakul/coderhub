const jwt = require('jsonwebtoken')
const { PRIVATE_KEY, PUBLIC_KEY } = require('../app/config')

class AuthController {
  async login(ctx, next) {
    // 颁发令牌

    const { id, name } = ctx.user;
    const token = jwt.sign({id,name},PRIVATE_KEY,{
      algorithm:'RS256',
      expiresIn:60*60*24*7 // 设置过期时间
    })

    ctx.body = { id, name, token }
  }

  async success(ctx,next){
    ctx.body = 'authorization success'
  }
}

module.exports = new AuthController();