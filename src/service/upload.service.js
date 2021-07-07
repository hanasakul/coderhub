const connection = require('../app/database')
class UploadService{
  async createAvatar(...args){
      const statement =  `INSERT INTO avatar (filename,mimetype,size,user_id) VALUES(?,?,?,?)`;
      return (await connection.execute(statement,args))[0];
  }

  async getAvatarById(userId){
    const statement =  `SELECT * FROM avatar WHERE user_id = ?`;
    const [result] = (await connection.execute(statement,[userId]))[0];
    return result;
  }


  async createWithPicture(...args){
    const statement =  `INSERT INTO with_picture (filename,mimetype,size,user_id,moment_id) VALUES(?,?,?,?,?)`;
    return (await connection.execute(statement,args))[0];
  }

  async getWithPictureByName(filename){
    const statement =  `SELECT * FROM with_picture WHERE filename = ?`;
    const [result] = (await connection.execute(statement,[filename]))[0];
    return result;
  }
}

module.exports = new UploadService();