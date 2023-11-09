const mongoose = require("mongoose");
const User = require("../schema/User");
const db_conn = require("../db_conn");

async function register(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({success: false, message: "Merci de remplir tout les champs."})
  }

  db_conn();

  const user = new User({ email: email, password: password});
  user.save();

  res.json({ email });
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
