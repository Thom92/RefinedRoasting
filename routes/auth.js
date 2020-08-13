const nodemailer = require("nodemailer")
const emailCreds = require("../configs/mail_credentials.json")

//Transporter object
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth : {
        user: emailCreds["email"],
        pass: emailCreds["password"]
    }
})

const bcrypt = require('bcrypt')
const { reponse } = require('express')
const rounds = 12
