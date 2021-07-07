const jwt = require('jsonwebtoken');

const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const errorTypes = require('../constants/error-types');
const { md5 } = require('../utils/password');
const { PUBLIC_KEY } = require('../app/config')


const passes = async (ctx, next) => {
  const { name, password } = ctx.request.body;

  // 2. 判断用户是否存在
  const user = (await userService.getUserByName(name))[0];
  if (!user) {
    return ctx.app.emit('error', new Error(errorTypes.USER_DOES_NOT_EXISTS), ctx)
  }


  // 3. 判断密码(加密后的)是否和数据库中的密码是一致
  if (md5(password) !== user.password) {
    return ctx.app.emit('error', new Error(errorTypes.PASSWORD_INCORRECT), ctx)
  }

  ctx.user = user;
  await next();
}


// 验证授权的中间件
const authorize = async (ctx, next) => {
  console.log('authorize');
  // 1. 获取 token
  const authorization = ctx.headers.authorization;
  const token = authorization?.replace('Bearer ', '');
  // 2. 验证 token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: 'RS256'
    })
    ctx.user = result;
    await next()
  } catch (e) {
    ctx.message = e.message;
    ctx.app.emit('error', new Error(errorTypes.UNAUTHORIZED), ctx)
  }

}


/**
 * 1 .很多的内容都需要验证权限: 修改/删除动态, 修改/删除评论
 * 2. 接口: 业务接口系统 / 后端管理系统
 * 一对一: user -> role
 * 多对多: role -> menu (删除动态/修改动态)
 */


// const permission = async (ctx, next) => {
//   console.log('permission');
//   // 1. 获取信息
//   const [key] = Object.keys(ctx.params) // 键名
//   const tableName = key.replace('Id',''); // 表名
//   const id  = ctx.params[key]; // id
//   const userId = ctx.user.id; // 用户id



//   // 2. 查询是否具备权限
//   try {
//     const isPermission = await authService.resolve(tableName,id,userId)
//     if (!isPermission) {
//       throw Error()
//     }
//     await next()
//   } catch (err) {
//     return ctx.app.emit('error', new Error(errorTypes.UNPREMISSION), ctx);
//   }
// }



const permission = tableName => async (ctx, next) => { // 利用闭包传入参数
  console.log('permission');
  // 1. 获取信息
  const [key] = Object.keys(ctx.params);
  const id = ctx.params[key]

  const userId = ctx.user.id;

  // console.log(userId);

  // 2. 查询是否具备权限
  try {
    const isPermission = await authService.resolve(tableName,id, userId)
 
    if (!isPermission) {
      throw Error()
    }
    await next()
  } catch (err) {
    return ctx.app.emit('error', new Error(errorTypes.UNPREMISSION), ctx);
  }
}







module.exports = {
  passes,
  authorize,
  permission,
}