const nodemailer = require('nodemailer') 
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "cambalache86i@gmail.com",
      pass: "iejnxpymsccxvjun",
    },
  });

  transporter.verify().then(() => {
    console.log('Listo para enviar emails')
  })

module.exports = {
    transporter
}