const User = require("../schema/User");
const EmailVerifierCode = require("../schema/EmailVerifierCode");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const send_email = require("../send_email");

async function register(req, res) {
  // récupération des données dans le corps de la requête.
  const { email, password, dream_capability } = req.body;

  // on vérifie si l'email et le mot de passe sont bien rentrée.
  if (!email || !password || !dream_capability) {
    return res.json({
      success: false,
      message: "Merci de remplir tout les champs.",
    });
  }

  // on vérifie si l'email est déja utilisée
  const userExist = await User.findOne({ email: email });

  if (userExist != null) {
    return res.json({
      success: false,
      message: "L'email entré est déjà utilisé",
    });
  }

  // on hash le mot de passe et on le stock dans une variable
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // création du nouvelle utilisateur
  const new_user = new User({
    email: email,
    password: hashedPassword,
    dream_capability: dream_capability,
    active: false,
  });

  // creation du code de vérification
  const verification_code = Math.random().toString(36).substring(7);
  const new_email_code = new EmailVerifierCode({code: verification_code, relatedEmail: email})

  // envoie de l'utilisateur et du code de vérification dans la base de donnée
  new_user.save();
  new_email_code.save();

  // envoie de l'email contenant le code de vérification
  send_email(email, verification_code);

  return res.json({
    success: true,
  });
}

async function login(req, res) {
  // récupération des données dans le corps de la requête.
  const { email, password } = req.body;
  const secret_key = process.env.JWT_KEY;

  // on vérifie si l'email et le mot de passe sont bien rentrée.
  if (!email || !password) {
    return res.json({
      success: false,
      message: "Merci de remplir tout les champs.",
    });
  }

  const user = await User.findOne({ email: email });

  if (user == null) {
    return res.json({
      success: false,
      message: "L'email entré est associé à aucun compte.",
    });
  }

  const passwordGood = await bcrypt.compare(password, user.password)

  if (!passwordGood) {
    return res.json({
      success: false,
      message: "Le mot de passe est incorrect.",
    });
  }

  if (user.active == false) {
    return res.json({
      success: false,
      message: "Merci de vérifier votre email.",
    });
  }

  const token = jwt.sign({email: email, dream_capability: user.dream_capability}, secret_key, {
    expiresIn: "2d"
  })

  return res.json({
    success: true,
    message: "Connexion réussi. Redirection....",
    token: token,
    user_data: {email: email}
  });
}

async function delete_account(req, res) {
  res.send("test");
}

async function update_password(req, res){
  const {decoded, current_password, new_password} = req.body

  const user = await User.findOne({email: decoded.email})

  const correctPassword = await bcrypt.compare(current_password, user.password)

  if (!correctPassword) {
    return res.json({success: false, message: "Le mot de passe est incorrect"})
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(new_password, salt);

  user.password = hashedPassword

  await user.save()

  return res.json({success: true, message: "Mot de passe mis à jour, redirection..."})
}

module.exports = {
  register,
  login,
  delete_account,
  update_password
};