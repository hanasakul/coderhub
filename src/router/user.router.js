const Router = require('koa-router');
const router = new Router({  prefix:'/users'});

const { 
  create,
  avatar
} = require('../controller/user.controller.js')


const { 
  checker,
  crypto,
  exists
} = require('../middleware/user.middleware')



router.post('/',checker,exists,crypto,create)


// 请求头像接口
router.get('/:userId/avatar',avatar)

module.exports = router;