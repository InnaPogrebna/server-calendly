const db = require('mysql2/promise');
const bcrypt = require("bcryptjs");
const passGenerator = require('generate-password');
const jwt = require("jsonwebtoken");
const { getEmployees } = require('./employeesService');
require('dotenv').config();
class UserService {
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
  async getUserInfo(userId) {
    let conn = await this.dbConnect();
    let sql = `SELECT * FROM users where user_id = '${userId}'`;
    let [res, err] = await conn.execute(sql);
    const listEmp = await getEmployees(conn)
    // console.log('list', listEmp)
    await this.dbClose(conn)
    return [typeof res[0] !== "undefined" ? res[0] : {}, listEmp];
  }

  // async getZoomInfo() {
  //   const response = await fetch(
  //     "https://api.zoom.us/v2/users/me",
  //     {
  //       method: "GET",
  //       headers: {
  //         // "Content-Type": "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6ImE4WEJ4RUx1U0dDS2RrNG9kN3gyX1EiLCJleHAiOjE2Njc5MDk2NTQsImlhdCI6MTY2NzMwNDg1NX0.Wi8vaKscbhYMicg6lNe-Gw9gYpwcehzIIMjX--DAjLQ"
  //       }
  //       // body: JSON.stringify(meetingdetails)
  //     }
  //   );

  //   console.log('getZoom', response)
  // }
}
module.exports = new UserService();