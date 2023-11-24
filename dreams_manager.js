const Dream = require("./schema/Dream");

async function create_dream(req, res) {
  const { dream_record, islucid, decoded } = req.body;

  if (!dream_record) {
    return res.json({ success: false, message: "Merci de remplir le champ." });
  }

  const now = new Date(Date.now());
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;

  const new_dream = new Dream({
    author: decoded.email,
    dream_record: dream_record,
    islucid: islucid,
    date: formattedDate,
  });

  new_dream.save();

  return res.json({ success: true, message: "Rêve ajoutée, chargement..." });
}

async function delete_dream(req, res) {
  res.send("reve supprimé");
}

module.exports = {
  create_dream,
  delete_dream,
};
