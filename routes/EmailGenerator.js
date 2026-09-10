require("dotenv").config();
const express = require("express");
const Router = new express.Router();
const nodemailer = require("nodemailer");
const fs = require("fs");

const source = fs.readFileSync("utils/index.html", "utf8");

Router.post("/send-email", (req, res) => {
  const { username, phoneNumber, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.G_USER,
      pass: process.env.G_PASS,
    },
  });

  const mailOptions = {
    from: "ESS, LLC",
    to: process.env.G_USER,
    subject: `Message from ${username}`,
    html: source
      .replaceAll("Your Name", username)
      .replaceAll("Email", email)
      .replaceAll("Message", message)
      .replaceAll("PhoneNumber", phoneNumber),
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error occurred:", error.message);
      res.status(500).send("Error occurred while sending email.");
    } else {
      console.log("Email sent successfully!");
      res.status(200).send("Email sent successfully!");
    }
  });
});
module.exports = Router;
