const uploadService = require('../service/upload.service')
const userService = require('../service/user.service')

const { APP_HOST,APP_PORT } = require('../app/config')

class UploadController {
  async saveAvatarInfo(ctx,next){
    // 1. 获取图像相关的信息
    const {filename, mimetype, size } = ctx.req.file;
    const  userId =  ctx.user.id;


    // 2. 将图像信息数据保存到数据库中
    const result = await uploadService.createAvatar(filename,mimetype,size,userId)


    // 3. 将图片地址保存到user表中
    const url = `${APP_HOST}:${APP_PORT}/users/${userId}/avatar`

    await userService.updateAvatarById(url,userId);
    
    ctx.body = '上传头像成功'
  }

  async saveWithPictureInfo(ctx,next){
    // 1. 获取图片信息
    const files = ctx.req.files;
    const  userId =  ctx.user.id;
    const { momentId } = ctx.query;


    // 2. 将所以文件信息保存到数据库中
    for (const file of files) {
      const {filename, mimetype, size } = file;
      
      await uploadService.createWithPicture(filename,mimetype,size,userId,momentId)
    }
    

    ctx.body = '图片上传成功'

  }
}

module.exports = new UploadController();