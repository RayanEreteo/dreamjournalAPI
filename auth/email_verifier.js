const EmailVerifierCode = require("../schema/EmailVerifierCode")
const db_conn = require("../db_conn");
const User = require("../schema/User");


async function verify(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.json({
      success: false,
      message: "Merci de fournir le code de vérification.",
    });
  }

  db_conn();

  const verification_code = await EmailVerifierCode.findOne({ code })

  if (!verification_code) {
    return res.json({
      success: false,
      message: "Code de vérification invalide.",
    });
  }

  const relatedEmail = verification_code.relatedEmail

  await EmailVerifierCode.deleteOne(verification_code)
  await User.updateOne({email: relatedEmail}, {$set: {active: true}})

  return res.send("votre email a été validé, vous pouvez maintenant vous connecter :")
}

module.exports = { verify };