const service = require('../service/tag.service')
const varifyTagExists = async (ctx,next) => {
  // 1. 取出要添加的所有标签
  const { tags } = ctx.request.body;
  console.log(tags);


  // 2. 判断每个标签在tag表中是否存在
  const newTags = [];


  
  for (const name of tags) {
    const result = await service.getTagByName(name);
    const tag = { name };
    if (!result.length) {
      const insertResult = await service.create(name);
      tag.id = insertResult.insertId;
    } else {
      tag.id = result[0].id;
    }
    newTags.push(tag);
  }

  console.log(newTags);


  ctx.tags = newTags;


  await next();
}

module.exports = {
  varifyTagExists
}