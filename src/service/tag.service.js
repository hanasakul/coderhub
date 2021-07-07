const connnection = require('../app/database');

class TagService {
  async create(name) {
    const statement = `INSERT INTO tag SET name=?`;
    return (await connnection.execute(statement, [name]))[0]
  }


  async getTagByName(name) {
    const statement = `SELECT * FROM tag where name = ?`;
    return (await connnection.execute(statement, [name]))[0]
  }

  async getTags(limit, offset) {
    const statement = `SELECT * FROM tag limit ?,?`;
    return (await connnection.execute(statement, [offset, limit]))[0]
  }
}

module.exports = new TagService();