const connection = require('../app/database');
class UserService {
  async create (user){
    const { name,password}  = user;
    const statement = `INSERT INTO user(name,password) VALUES(?,?);`
    
    // 将user存储到数据库中
    return (await connection.execute(statement,[name,password]))[0]
  }

  async getUserByName(name){
    const statement = `SELECT * FROM user WHERE NAME = ?;`
    return (await connection.execute(statement,[name]))[0];
  }

  // 更新头像
  async updateAvatarById(url,userId){
      const statement = `UPDATE user set avatar = ? WHERE id = ?`;
      return (await connection.execute(statement,[url,userId]))[0];
  }
}

module.exports = new UserService()