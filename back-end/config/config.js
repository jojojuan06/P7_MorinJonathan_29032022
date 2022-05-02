require('dotenv').config();

module.exports =
config = {
    "development": {
      "username": process.env.USER,
      "password": process.env.PASSWORD,
      "database": process.env.DATABASE,
      "host": 'localhost',
      "port": '3306',
      "dialect": "mysql"
    },
    "test": {
      "username": process.env.USER,
      "password": null,
      "database": process.env.DATABASE,
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": process.env.USER,
      "password": null,
      "database": process.env.DATABASE,
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
}