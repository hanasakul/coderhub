const fs = require('fs');

const Jimp = require('jimp')

const momentService = require('../service/moment.service');
const uploadService = require('../service/upload.service');


const { PICTURE_PATH } = require('../constants/path')

class MomentController {
  async create(ctx, next) {
    // 1. 获取数据(user_id,content)
    const userId = ctx.user.id;
    const content = ctx.request.body.content;

    // 2. 将数据插入到数据库中,并响应结果
    ctx.body = await momentService.create(userId, content)
  }

  async query(ctx, next) {
    // 1. 获取参数(offset,size)
    const { offset, size } = ctx.query;

    // 2. 查询所有数据
    ctx.body = await momentService.query(offset, size)
  }
  async detail(ctx, next) {
    // 1. 获取数据(momentId)
    const momentId = ctx.params.momentId;

    // 2. 根据id去查询这条数据
    ctx.body = await momentService.getMomentById(momentId);
  }

  async update(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;

    // 修改内容
    ctx.body = await momentService.update(content, momentId)
  }

  async remove(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;

    ctx.body = await momentService.delete(momentId);
  }


  async addTags(ctx, next) {
    // 1.获取标签和动态id
    const tags = ctx.tags;
    const { momentId } = ctx.params;


    // 2. 添加所有标签

    for (const tag of tags) {
      // 判断标签是否已经和动态有过关系了
      const isExists = await momentService.hasTag(momentId, tag.id)
      if (!isExists.length) {
        await momentService.addTag(momentId, tag.id)
      }
    }
    ctx.body = "添加标签成功"
  }


  // 图片显示
  async withPicture(ctx, next) {
    let { filename } = ctx.params;
    const info = await uploadService.getWithPictureByName(filename)

    const { type, params } = ctx.query;

    // 如果都没有传并返回原图
    let filepath = `${PICTURE_PATH}/${filename}`
    const types = ['large', 'middle', 'small'];

    // 动态图片处理
    if (params) {
      let [w, h] = params.split(new RegExp('y|x'));
      let image = await Jimp.read(filepath);
      filepath = `${filepath}_${w}x${h}`;
      image.resize(+w, +h).write(filepath)
    } else if (types.some(item => item == type)) {
      filepath += '_' + type
    }


    ctx.response.set('content-type', info.mimetype)
    ctx.body = fs.createReadStream(filepath);


  }

}

module.exports = new MomentController();