const db = require('mysql2/promise');
const bcrypt = require("bcryptjs");
const passGenerator = require('generate-password');
const jwt = require("jsonwebtoken");
require('dotenv').config();

class EmployeesService {
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

  async addEmployees(req) {
    var conn = await this.dbConnect();
    const { first_name, last_name, user_token } = req;

    if (!await this.getUser(first_name, last_name, user_token)) {
      var sql = `INSERT INTO employees (first_name, last_name, user_token) VALUES ('${first_name}', '${last_name}', '${user_token}')`;
      var [result, error] = await conn.execute(sql);
      this.dbClose(conn);
      return { error: false, message: 'Employee' + ' is done' };
    } else {
      return { error: true, message: 'Employee' + ' is exists' };
    }
  }

  async removeEmployees(req) {
    var conn = await this.dbConnect();
    const { employee_id, first_name, last_name } = req[0];
    const sqlResponse = `SELECT EXISTS(SELECT employee_id FROM employees WHERE employee_id = '${employee_id}')`;
    var [result, error] = await conn.execute(sqlResponse);
    console.log('sql', result)
    this.dbClose(conn);

    if (result) {
      var conn = await this.dbConnect();
      const removeEmployee = `DELETE FROM employees WHERE employee_id = '${employee_id}'`;
      var [result, error] = await conn.execute(removeEmployee);
      console.log('removeEmpl', result)
      const sql = `SELECT * FROM employees`;
      var [newData, error] = await conn.execute(sql);
      console.log('remoT', newData)
      this.dbClose(conn);
      return {
        error: false,
        message: `${first_name} ${last_name} removed`,
        data: newData,
      }
    } else {
      return { error: true, message: 'ERROR Token' };
    }
  }

  async updateEmployees(req) {
    var conn = await this.dbConnect();
    const { employee_id, first_name, last_name } = req[0];
    const { firstName, lastName } = req.newEmployee;
    console.log('employee_id', employee_id)
    console.log('nenf', req);
    const sql = `SELECT * FROM employees WHERE employee_id = '${employee_id}'`;
    var [result, error] = await conn.execute(sql);
    console.log('resultQ', result);
    this.dbClose(conn);
    if (result) {
      var conn = await this.dbConnect();
      const sqlUpdate = `UPDATE employees SET last_name = '${lastName}', first_name = '${firstName}'  WHERE employee_id='${employee_id}'`
      var [result, error] = await conn.execute(sqlUpdate);
      const newData = `SELECT * FROM employees`;
      var [newResult, error] = await conn.execute(newData);
      this.dbClose(conn);
      return {
        error: false,
        message: `Employee updated`,
        data: newResult
      }
    } else {
      return { error: true, message: 'ERROR Token' };
    }
  }
  // console.log('resSQL', result)
  //   var sql = `INSERT INTO employees (first_name, last_name, login, password) VALUES ('${first_name}', '${last_name}'  '${login}', '${hashPass}')`;
  //   var [result, error] = await conn.execute(sql);
  //   this.dbClose(conn);
  //   if (typeof result.insertId !== "undefined") {
  //     console.log('insertId', result.insertId)
  //     // var token = await this.generateToken(result.insertId);
  //     // console.log('token', token);
  //     const data = {
  //       error: false, message: 'Employee done',
  //       //token: token
  //     }
  //     console.log('data', data)
  //     return data;
  //   } else {

  //     return { error: true, message: 'Employee ' + ' is exists' };
  //   }
  // } else {
  //   return { error: true, message: 'Employee' + ' is exists' };
  // }
  // }

  async getEmployees(conn) {
    let sqlEmployees = `SELECT * FROM employees`;
    let [res, err] = await conn.execute(sqlEmployees);
    return res;
  }

  async getUser(first_name, last_name, user_token) {
    var conn = await this.dbConnect();
    var sql = `SELECT * FROM employees WHERE first_name = '${first_name}' AND last_name = '${last_name}' AND user_token = '${user_token}'`;
    const [result, error] = await conn.execute(sql);
    // console.log('res', result);
    this.dbClose(conn);
    return typeof result[0] !== "undefined" ? result[0] : false;
  }
}
module.exports = new EmployeesService();