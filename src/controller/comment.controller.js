const commentService = require('../service/comment.service');
const CommentService = require('../service/comment.service');
class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body;

    const { id } = ctx.user;

    ctx.body = await CommentService.create(momentId, content, id);
  }

  async query(ctx,next){
    const { momentId } = ctx.query;
    ctx.body = await CommentService.getCommentsByMomentId(momentId);
  }

  async reply(ctx, next) {
    const { momentId, content } = ctx.request.body;
    const { commentId } = ctx.params
    const userId = ctx.user.id;

    ctx.body = await CommentService.reply(momentId, content, userId, commentId);
  }

  async remove(ctx, next) {
    const { commentId } = ctx.params;

    ctx.body = await commentService.delete(commentId);
  }

  async update(ctx, next) {
    const { content } = ctx.request.body;
    const { commentId } = ctx.params;

    ctx.body = await CommentService.update(content, commentId);
  }

}

module.exports = new CommentController();