const connection = require('../app/database')
class AuthService {
  async resolve(tableName, id, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?;`
    return (await connection.execute(statement, [id, userId]))[0].length;
  }

}

module.exports = new AuthService();