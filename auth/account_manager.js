const User = require("../schema/User");
const db_conn = require("../db_conn");
const bcrypt = require("bcrypt");

async function register(req, res) {
  // récupération de l'email et le mot de passe dnas le corps de la requête.
  const { email, password } = req.body;

  // on vérifie si l'email et le mot de passe sont bien rentrée.
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Merci de remplir tout les champs.",
    });
  }

  // connexion a la base de donnée
  db_conn();

  // on vérifie si l'email est déja utilisée
  const userExist = await User.findOne({ email: email });

  if (userExist != null) {
    return res.json({
      success: false,
      message: "L'email entrée est deja utilisée",
    });
  }

  // on hash le mot de passe et on le stock dans une variable
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // création du nouvelle utilisateur
  const new_user = new User({ email: email, password: hashedPassword });

  // envoie de l'utilisateur dans la base de donnée
  new_user.save();

  res.json({
    success: true,
    message: "Le compte a été crée avec succès. Redirection....",
  });
}

async function login(req, res) {
  res.send("test");
}

async function delete_account(req, res) {
  res.send("test");
}

module.exports = {
  register,
  login,
  delete_account,
};
