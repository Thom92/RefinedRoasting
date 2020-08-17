const knex = require("../database/knexfile.js")

//Mail reset dependencies

const { v4: uuidv4 } = require("uuid")
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

//Importing bcrypt to hash passwords
const bcrypt = require("bcrypt")
const { response } = require("express")
const rounds = 12