const db = require("../models");
const config = require("../config/config");
const Auth = db.auth;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  Auth.create({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  }).then(
      res.send({ message: "register successfully" })
    )
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.signin = (req, res) => {
  Auth.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(auth => {
      if (!auth) {
        return res.status(404).send({ message: "username error" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        auth.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "password error"
        });
      }

      var token = jwt.sign({ id: auth.id }, config.secret, {
        expiresIn: 86400 // 24 saat
      });

        res.status(200).send({
          id: auth.id,
          username: auth.username,
          email: auth.email,
          accessToken: token
        });
    })

    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
