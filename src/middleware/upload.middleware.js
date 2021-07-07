const path = require('path');

const Multer = require('koa-multer');
const Jimp = require('jimp') 
const { AVATAR_PATH,PICTURE_PATH } = require('../constants/path')

const avatar = Multer({
  dest:AVATAR_PATH
})
const avatarHandler = avatar.single('avatar');


const picture = Multer({
  dest:PICTURE_PATH
})

const pictureResize = async (ctx,next)=>{


  // 1.获取所有图像信息
  const files = ctx.req.files;
  for (const file of files) {
    const dest = file.path;
    // 2. 对图像进行处理(sharp,jimp)
    Jimp.read(dest).then(image=>{
      image.resize(1280,Jimp.AUTO).write(`${dest}_large`)
      image.resize(640,Jimp.AUTO).write(`${dest}_middle`)
      image.resize(320,Jimp.AUTO).write(`${dest}_small`)
    })
  }

  await next();
}

const pictureHandler = picture.array('picture',9);

module.exports = { avatarHandler, pictureHandler,pictureResize }