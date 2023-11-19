const jwt = require("jsonwebtoken");

module.exports = function token_verify(req, res, next) {
  const token = req.headers.authorization;
  const secret_key = process.env.JWT_KEY;

  if (!token) {
    return res.status(401).json({success: false, message: "Token non identifiée."});
  }

  let decoded; // Déclarer decoded à l'extérieur de la fonction de rappel

  jwt.verify(token, secret_key, (err, result) => {
    if (err) {
      console.log(err);
      return res.json({success: false, message: "Le token est invalide."});
    }
    decoded = result; // Assigner la valeur à decoded ici
  });

  req.body.decoded = decoded; // Maintenant decoded est accessible à cette étape

  next();
};
