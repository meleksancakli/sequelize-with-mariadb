module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "maria123",
  DB: "myapp",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  //JWT
  secret: "secret",
};