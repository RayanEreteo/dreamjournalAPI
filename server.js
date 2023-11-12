const express = require("express")
const body_parser = require("body-parser")
const cors = require("cors")

const email_verifier = require("./auth/email_verifier")
const account_manager = require("./auth/account_manager")

const app = express()
app.use(cors())
app.use(body_parser.json())


app.post("/register", account_manager.register)
app.post("/login", account_manager.login)

app.get("/verify/:code", email_verifier.verify)


app.listen('5000', (err) => {
    if (err) {
        console.log(err)
    }else{
        console.log("en route")
    }
})