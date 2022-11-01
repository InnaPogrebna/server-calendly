// module.exports = {
//     "up": "CREATE TABLE employees (employee_id int(11) not null auto_increment, first_name varchar(255) not null, last_name varchar(255) not null, login varchar(255) not null, password varchar(255) not null, primary key (employee_id))",
//     "down": "DROP TABLE employees"
// }

module.exports = {
    "up": "CREATE TABLE employees (employee_id int(11) not null auto_increment, first_name varchar(255) not null, last_name varchar(255) not null, user_token TEXT not null, primary key (employee_id))",
    "down": "DROP TABLE employees"
}