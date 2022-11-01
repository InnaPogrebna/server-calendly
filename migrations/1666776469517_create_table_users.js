module.exports = {
    "up": "CREATE TABLE users (user_id int(11) not null  auto_increment, name varchar(255) not null , login varchar(255) not null ,password varchar(255) not null, date_create DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,  primary key (user_id))",
    "down": "DROP TABLE users"
}