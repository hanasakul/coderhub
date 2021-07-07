const connection = require('../app/database')
class CommentService {
  async create(...args) {
    const statement = `INSERT INTO comment(moment_id,content,user_id) VALUES(?,?,?)`
    return (await connection.execute(statement, args))[0];
  }

  async reply(...args) {
    try {
      const statement = `INSERT INTO comment(moment_id,content,user_id,comment_id) VALUES(?,?,?,?)`
      return (await connection.execute(statement, args))[0];
    } catch (e) {
      console.log(e);
      return 'Server internal error'
    }

  }

  async delete(id) {
    const statement = `DELETE FROM comment WHERE id=?`;
    return (await connection.execute(statement, [id]))[0];
  }

  async update(...args) {
    const statement = `UPDATE comment SET content=? where id = ?`;
    return (await connection.execute(statement, args))[0];
  }

  async getCommentsByMomentId(id) {
    try {
      const statement = `SELECT c.id,content,comment_id commentId,c.createdAt createTime,
      JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar) user
      FROM comment c
      LEFT JOIN user u ON u.id = c.user_id
      WHERE moment_id = ?`;
      return (await connection.execute(statement, [id]))[0];
    } catch (error) {
      console.log(error);
    }

  }
}

module.exports = new CommentService()