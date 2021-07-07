const errorTypes = require('../constants/error-types')
const service = require('../service/user.service')
const {
  md5
} = require('../utils/password')


// 2. 判断用户名或者密码不能为空
const checker = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  if (!name || !password) {
    // 发送错误处理
    return ctx.app.emit('error', new Error(errorTypes['NAME_OR_PASSWORD_IS_EMPTY']), ctx);
  }

  await next();
}



const exists = async (ctx, next) => {
  // 1. 获取用户名和密码
  const { name } = ctx.request.body;


  // 3. 确保这次注册的用户名是否没有注册过的
  let isRegistered = (await service.getUserByName(name)).length
  if (isRegistered) {
    return ctx.app.emit('error', new Error(errorTypes['USER_ALREADY_EXISTS']), ctx);
  }
  await next();
}

// 对密码进行加密
const crypto = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5(password);

  await next();
}

module.exports = {
  checker,
  crypto,
  exists
}