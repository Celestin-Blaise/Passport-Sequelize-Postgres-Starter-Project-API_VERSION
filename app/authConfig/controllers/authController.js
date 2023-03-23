var exports = (module.exports = {});

exports.signup = function (req, res) {
  res.send("ENTER VALID SIGNUP DETAILS");
};

exports.signin = function (req, res) {
  res.send("ENTER VALID LOGIN DETAILS");
};

exports.dashboard = function (req, res) {
  res.send(
    "AUTHENTICATION IS SUCCESSFUL, YOU ARE NOW LOGGED IN TO YOUR DASHBOARD"
  );
};

exports.logout = function (req, res) {
  req.session.destroy(function (err) {
    res.send("SESSION ENDED, YOU'VE BEEN LOGGED OUT SUCCESSFULY");
  });
};
