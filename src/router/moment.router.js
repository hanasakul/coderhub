const Router = require('koa-router');

const momentRouter = new Router({ prefix:'/moment' })

const { authorize,permission } = require('../middleware/auth.middleware');
const { create,detail,query,update,remove,addTags,withPicture} = require('../controller/moment.controller');


const {
  varifyTagExists
} = require('../middleware/tag.middleware');


// 发表动态
momentRouter.post('/',authorize,create)

// 根据id查询该用户的所有动态信息
momentRouter.get('/',query) 

// 根据动态id查询该动态的详情
momentRouter.get('/:momentId',detail) 



// 1.用户必须登录 
// 2. 用户必须具备修改的权限
momentRouter.patch('/:momentId',authorize,permission('moment'),update) 

momentRouter.delete('/:momentId',authorize,permission('moment'),remove) 




// 给动态添加标签
momentRouter.post('/:momentId/tags',authorize,permission('moment'),varifyTagExists,addTags)



// 动态配图服务
momentRouter.get('/images/:filename',withPicture)
module.exports = momentRouter;

