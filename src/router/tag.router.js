const Router = require('koa-router');

const { authorize } = require('../middleware/auth.middleware');
const { create , query  } = require('../controller/tag.controller');

const tagRouter = new Router({prefix:'/tag'})


tagRouter.post('/',authorize,create)
tagRouter.get('/',query)


module.exports = tagRouter;