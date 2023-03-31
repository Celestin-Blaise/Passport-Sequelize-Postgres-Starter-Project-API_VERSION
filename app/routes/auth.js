const authController = require("../authConfig/controllers/authController");

module.exports = function (app, passport) {
  //SIGNUP A NEW USER WITH PASSPORT
  app.post("/signup", passport.authenticate("local-signup"), (req, res) => {
    res.json({
          session: req.session,
          authStatus: true,
          message: "Sign Up Successful",
        });
  });

  //PROTECTED DASHBOARD ROUTE
  app.get("/dashboard", isLoggedIn, authController.dashboard);

  //SIGNIN AN EXISTING USER WITH PASSPORT
  app.post("/signin", passport.authenticate("local-signin"), (req, res) => {
    res.json({
          session: req.session,
          authStatus: true,
          message: "Login Successful",
        });
  });
  
  //SIGNIN AN EXISTING USER WITH PASSPORT & GET AUTH ERROR MESSAGES BUT NO COOKIES SET
  
  // app.post("/signin", (req, res, next) => {
  //   passport.authenticate("local-signin", async (err, user, info) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) {
  //       // *** Display message without using flash option
  //       res.json({
  //         authStatus: false,
  //         message: info.message,
  //       });
  //     } else {
  //       console.log(req.session);
  //       // await req.session.commit();
  //       // await res.setHeader("Set-Cookie", req.session.cookie.serialize());
  //         res.json({
  //           cookie: req.session.cookie,
  //           authStatus: true,
  //           message: "Login Successful",
  //         });
  //     }
  //   })(req, res, next);
  // });

  //SIGNOUT USER & DESTROY SESSION
  app.post("/logout", authController.logout);

  //VALIDATE ACTIVE & INACTIVE SESSIONS
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.json({
      session: req.session,
      message: "AUTHENTICATION FAILED, YOU NEED TO LOGIN or CREATE AN ACCOUNT",
      authStatus: false,
    });
  }
};
