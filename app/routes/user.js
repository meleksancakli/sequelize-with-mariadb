const user = require("../controllers/user.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/user/create", user.create);

  app.get("/api/users", user.findAll);

  app.get("/api/user/:id", user.findOne);

  app.put("/api/user/:id", user.update);

  app.delete("/api/user/:id", user.delete);

  app.delete("/api/users/", user.deleteAll);
};

