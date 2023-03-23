var authController = require("../authConfig/controllers/authController");

module.exports = function (app, passport) {
  //SIGNUP A NEW USER WITH PASSPORT
  app.post("/signup", passport.authenticate("local-signup"), (req, res) => {
    res.send(200);
  });

  //PROTECTED DASHBOARD ROUTE
  app.get("/dashboard", isLoggedIn, authController.dashboard);

  //SIGNIN AN EXISTING USER WITH PASSPORT
  app.post("/signin", passport.authenticate("local-signin"), (req, res) => {
    res.send(200);
  });

  //SIGNOUT USER & DESTROY SESSION
  app.post("/logout", authController.logout);

  //VALIDATE ACTIVE & INACTIVE SESSIONS
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.send("AUTHENTICATION FAILED, YOU NEED TO LOGIN or CREATE AN ACCOUNT");
  }
};
