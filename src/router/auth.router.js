const Router = require('koa-router');

const authRouter = new Router();

const { login, success } = require('../controller/auth.controller')

const { checker } = require('../middleware/user.middleware.js');
const {
  passes,
  authorize,
} = require('../middleware/auth.middleware.js');




authRouter.post('/login', checker, passes, login);

// 测试接口
// 测试用户是否授权
authRouter.get('/test', authorize, success);

module.exports = authRouter;