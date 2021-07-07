const Router = require('koa-router');

const { authorize } = require('../middleware/auth.middleware');
const { avatarHandler, pictureHandler,pictureResize } = require('../middleware/upload.middleware');

const { saveAvatarInfo,saveWithPictureInfo } = require('../controller/upload.controller');


const router = new Router({prefix:'/upload'})

// 上传头像接口
router.post('/avatar',authorize,avatarHandler,saveAvatarInfo)

router.post('/picture',authorize,pictureHandler,pictureResize,saveWithPictureInfo)


module.exports = router;