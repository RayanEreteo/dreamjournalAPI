const EmailVerifierCode = require("../schema/EmailVerifierCode")
const User = require("../schema/User");


module.exports = async function email_verifier(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.send("Merci de fournir le code de vérification.")
  }

  const verification_code = await EmailVerifierCode.findOne({ code })

  if (!verification_code) {
    return res.send("Le code de vérification est incorrect ou n'est plus disponible.")
  }

  const relatedEmail = verification_code.relatedEmail

  await EmailVerifierCode.deleteOne(verification_code)
  await User.updateOne({email: relatedEmail}, {$set: {active: true}})

  return res.send("votre email a été validé, vous pouvez maintenant vous connecter à DreamKeeper.com")
}