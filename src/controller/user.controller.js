const fs = require('fs');

const userService = require('../service/user.service')
const uploadService = require('../service/upload.service')


const { AVATAR_PATH } = require('../constants/path')


//请求路径匹配后,具体的处理
class UserController{
  async create(ctx,next){
      // 获取用户请求传递的参数
      const user = ctx.request.body
      
      // 查询数据
      const result = await userService.create(user);

      // 返回数据
      ctx.body = result;
  }


  //  请求头像
  async avatar(ctx,next){
    // 用户头像是那个文件
    const { userId }  = ctx.params;

    const avatarInfo = await uploadService.getAvatarById(userId)

    
    // 2. 提供图片
    ctx.response.set('content-type',avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}


module.exports  = new UserController()