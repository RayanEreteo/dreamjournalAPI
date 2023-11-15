const express = require("express")
const body_parser = require("body-parser")
const cors = require("cors")

const email_verifier = require("./auth/email_verifier")
const account_manager = require("./auth/account_manager")
const db_conn = require("./db_conn");


const app = express()
app.use(cors())
app.use(body_parser.json())


// connexion a la base de donnée
db_conn();

app.post("/register", account_manager.register)
app.post("/login", account_manager.login)

app.get("/verify", email_verifier)


app.listen('5000', (err) => {
    if (err) {
        console.log(err)
    }else{
        console.log("en route")
    }
})