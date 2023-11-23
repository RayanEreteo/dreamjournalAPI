const express = require("express")
const body_parser = require("body-parser")
const cors = require("cors")
require('dotenv').config()

const email_verifier = require("./auth/email_verifier")
const account_manager = require("./auth/account_manager")
const db_conn = require("./db_conn");
const token_verify = require("./auth/token_verify")

const app = express()
app.use(cors())
app.use(body_parser.json())

// connexion a la base de donnée
db_conn();

// ressource public
app.post("/register", account_manager.register)
app.post("/login", account_manager.login)

app.get("/verify", email_verifier)


// ressource protégé
app.post("/tokenchecker", token_verify, (req, res) => {
    res.send("ressource autorisée, utilisateur : " + req.body.decoded.email)
})

app.post("/passupdate", token_verify, account_manager.update_password)

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err)
    }else{
        console.log("en route")
    }
})