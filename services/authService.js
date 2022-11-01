const db = require('mysql2/promise');
const bcrypt = require("bcryptjs");
const passGenerator = require('generate-password');
const jwt = require("jsonwebtoken");
require('dotenv').config();
class AuthService {
  async dbConnect() {
    var conn = await db.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME
    });
    return conn;
  }
  dbClose(conn) {
    conn.end((err) => {
      if (err) {
        console.error(err);
        return err;
      }
    });
  }
  async register(login, pass){
    var conn = await this.dbConnect();

    //pass = pass || passGenerator.generate({length: 10, numbers: true});
    var  hashPass = bcrypt.hashSync(pass,7);
    if (!await this.getUserInfoByLogin(login)){
      var sql = `INSERT INTO users (name, login, password) VALUES ('admin', '${login}', '${hashPass}')`;
      var [result, error] = await conn.execute(sql);
      this.dbClose(conn);
      if(typeof result.insertId !== "undefined"){
        console.log('insertId', result.insertId )
        var token = await this.generateToken(result.insertId);
        console.log('token',token);
        const data = {
          error: false, message: 'done', token: token
        }
        console.log('data', data)
        return data;
      }else{
        
        return { error: true, message: 'login ' + login + ' is exists' };
      }
    }else{
      return {error:true, message: 'login '+ login+ ' is exists'};
    }
  }

  async login(login, pass) {
    if (await this.getUserInfoByLogin(login)) {
      const user = await this.getUserInfoByLogin(login);
      let checkPass = bcrypt.compareSync(pass, user.password)
      if (checkPass === true) {
        var token = await this.generateToken(user.user_id);
        return { error: false, message: 'correct', token: token };
      } else {
          return { error: true, message: 'Login or pass not correct' };
      }
    } else {
      return { error: true, message: 'Login or pass not correct' };
    }
  }

  async generateToken(userId){
    const payload = {
      userId
    };
    return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "24h" });
  }

  async getUserInfoByLogin(login){
    var conn = await this.dbConnect();
    var sql = `SELECT * FROM users WHERE login = '${login}'`;
    const [result, error]  = await conn.execute(sql);
    console.log('res',result);
    this.dbClose(conn);
    return typeof result[0] !== "undefined" ? result[0] : false;
  }
}
module.exports = new AuthService();