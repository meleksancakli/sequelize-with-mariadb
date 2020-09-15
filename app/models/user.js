module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.INTEGER
    }
  });

  return User;
};