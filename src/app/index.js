const Koa = require('koa');
const bodyParser = require('koa-bodyparser')
const errorHandle = require('./error')
const useRoutes = require('../router')

const app = new Koa();

app.useRoutes = useRoutes;




// 参数解析
app.use(bodyParser());

// 请求路径 - 中间件处理的映射关系 router
app.useRoutes();

// 错误处理
app.on('error',errorHandle)


module.exports = app;

