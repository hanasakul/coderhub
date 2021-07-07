const connection = require('../app/database')
class MomentService {
  // #sqlFragment = '';
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id,content) VALUES(?,?)`;
    return (await connection.execute(statement, [userId, content]))[0]
  }

  async query(offset, size) {
    const statement = `
      SELECT 
        m.id id, content,  m.createdAt publishTime, m.updatedAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name) author,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
        (SELECT COUNT(*) FROM moment_tag mt WHERE m.id = mt.moment_id) tagCount,
        (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:8000/moment/images/',p.filename)) FROM with_picture p WHERE moment_id = m.id ) images
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      limit ?,?`;
    const [result] = await connection.execute(statement, [offset, size])
    return result;
  }

  async getMomentById(id) {
    try {
      const statement = `
      SELECT 
      m.id id, m.content content, m.createdAt publishTime, m.updatedAt updateTime,
      JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar) author,

      IF(COUNT(c.id), JSON_ARRAYAGG(
        JSON_OBJECT('id',c.id,'content',c.content,'commentId',c.comment_id,'createTime',c.createdAt,
              'user',JSON_OBJECT('id',cu.id,'name',cu.name,'avatar',cu.avatar))
      ),NULL) comments,
      
      (SELECT 
        IF(COUNT(t.name), JSON_ARRAYAGG(JSON_OBJECT('id',t.id,'name',t.name))
        ,NULL) FROM moment_tag mt 
        LEFT JOIN tag t ON mt.tag_id = t.id
        WHERE mt.moment_id = m.id) tags,
      (SELECT JSON_ARRAYAGG(CONCAT('http://localhost/moment/images/',p.filename)) FROM with_picture p WHERE moment_id = m.id ) images
    FROM moment m
    left JOIN user u ON m.user_id = u.id
    left JOIN comment c ON  c.moment_id = m.id
    left JOIN user cu ON c.user_id = cu.id
    WHERE  m.id = ? group by m.id;`
      const [result] = await connection.execute(statement, [id]);
      return result[0]
    } catch (error) {
      console.log(error);
    }

  }

  async update(...args) {
    const statement = `UPDATE moment SET content=? WHERE id=?;`
    return (await connection.execute(statement, args))[0]
  }

  async delete(id) {
    const statement = `DELETE FROM moment WHERE id=?;`
    return (await connection.execute(statement, [id]))[0];
  }

  async hasTag(momentId,tagId){
    const statement = `SELECT * FROM moment_tag WHERE moment_id = ? AND tag_id = ?`;
    return (await connection.execute(statement,[momentId,tagId]))[0]
  }

  async addTag(momentId,tagId){
    const statement = `INSERT INTO moment_tag(moment_id,tag_id) values(?,?)`;
    return (await connection.execute(statement,[momentId,tagId]))[0]
  }
}

module.exports = new MomentService();