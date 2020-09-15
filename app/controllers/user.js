const db = require("../models/");
const User = db.user;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  if (!req.body.name || !req.body.age) {
    res.status(400).send({
      message: "can not be empty"
    });
    return;
  }
  const user = {
    name: req.body.name,
    age: req.body.age
  };
  User.create(user)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error"
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "findall error"
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "error, id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "updated"
        });
      } else {
        res.send({
          message: `cannot update user, id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "error update user, id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user deleted"
        });
      } else {
        res.send({
          message: `cannot delete user, id=${id}`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "error delete user, id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
    User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} users deleted` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "error, removing users."
      });
    });
};
