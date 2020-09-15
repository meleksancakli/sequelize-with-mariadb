const db = require("../models");
const Auth = db.auth;

controlUsernameOrEmail = (req, res, next) => {
  Auth.findOne({
    where: {
      username: req.body.username
    }
  }).then(auth => {
    if (auth) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    Auth.findOne({
      where: {
        email: req.body.email
      }
    }).then(auth => {
      if (auth) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

const signup = {
  controlUsernameOrEmail: controlUsernameOrEmail,
};

module.exports = signup;
