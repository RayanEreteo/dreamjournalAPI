const jwt = require("jsonwebtoken");

module.exports = function token_verify(req, res, next) {
  const token = req.headers.authorization;
  const secret_key = process.env.JWT_KEY;

  if (!token) {
    return res.status(401).json({success: false, message: "Token non identifiée."});
  }

  jwt.verify(token, secret_key, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(401).json({success: false, message: "Le token est invalide."});
    }

    req.body.decoded = result;
    next();
  });
};
