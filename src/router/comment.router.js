const Router  = require('koa-router');

const commentRouter = new Router({ prefix:'/comment' })
const { authorize,permission } = require('../middleware/auth.middleware')

const { create,reply,update,remove,query } = require('../controller/comment.controller')


commentRouter.post('/',authorize,create)

// 回复评论
commentRouter.post('/:commentId/reply',authorize,reply)



// 修改评论
commentRouter.patch('/:commentId/reply',authorize,permission('comment'),update)

// 删除评论

commentRouter.delete('/:commentId/reply',authorize,permission('comment'),remove);
module.exports = commentRouter;


// 将评论与动态进行分离

// 获取评论
commentRouter.get('/',query);