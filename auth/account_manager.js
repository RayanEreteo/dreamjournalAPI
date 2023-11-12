const User = require("../schema/User");
const EmailVerifierCode = require("../schema/EmailVerifierCode");

const db_conn = require("../db_conn");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")

async function register(req, res) {
  // récupération des données dans le corps de la requête.
  const { email, password, dream_capability } = req.body;

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

  const verificationCode = Math.random().toString(36).substring(7);

  const new_email_code = new EmailVerifierCode({code: verificationCode, relatedEmail: email})

  // envoie de l'utilisateur et du code de vérification dans la base de donnée
  new_user.save();
  new_email_code.save();

  // envoie de l'email contenant le code de vérification
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "rayabf5@gmail.com",
      pass: "vqmg bkxy uuth maqk"
    }
  })

  const mailOptions = {
    from: "rayabf5@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Merci de cliquer sur ce lien pour vérifier votre email: http://your-verification-url/${verificationCode}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    }
  })

  return res.json({
    success: true,
  });
}

async function login(req, res) {
  // récupération des données dans le corps de la requête.
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

  const userExist = await User.findOne({ email: email });

  if (userExist == null) {
    return res.json({
      success: false,
      message: "L'email entré est associé à aucun compte",
    });
  }

  if (userExist.active == false) {
    return res.json({
      success: false,
      message: "Merci de vérifier votre email",
    });
  }

  //! Besoin de créer la fontction du jwt

  return res.json({
    success: true,
    message: "Connexion réussi. Redirection....",
  });
}

async function delete_account(req, res) {
  res.send("test");
}

module.exports = {
  register,
  login,
  delete_account,
};
