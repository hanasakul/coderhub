const service = require('../service/tag.service');

class TagController{
  async create(ctx,next){
    const { tagName } = ctx.request.body;
    ctx.body = await service.create(tagName);
  }

  async query(ctx,next){
    const { limit,offset } = ctx.query;
    ctx.body = await service.getTags(limit,offset);
  }
}

module.exports = new TagController();