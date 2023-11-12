function verify(req, res) {
  const { code } = req.body;

  if (!code) {
    return res.json({
      success: false,
      message: "Merci de fournir le code de vérification.",
    });
  }
}

module.exports = { verify };
