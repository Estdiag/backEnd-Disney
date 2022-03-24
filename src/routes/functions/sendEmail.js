const { token } = require("morgan");
const nodemailer = require("nodemailer");
const { ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

let mailOptions = {
  from: ADMIN_EMAIL,
  to: "",
  subject: "¡Bienvenido a Disney!",
  html: "",
};

const sendEmail = (emailTo, nameTo, tokenTo) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ADMIN_EMAIL,
      pass: ADMIN_PASSWORD,
    },
  });

  const email = emailTo;
  const name = nameTo;
  const token = tokenTo;
  const message = `
<h3>Hola ${name} 👋,</h3>
<p>Gracias por unirte a nuestra comunidad, espero sea de tu utilidad 💻</p>
<p>Puedes usar este token para consumir nuestra API</p>
<ul>
    <li>${token}</li>
    
</ul>`;

  mailOptions["to"] = email;
  mailOptions["html"] = message;

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return error.message;
    } else {
      return "send";
    }
  });
};
module.exports = {
  sendEmail,
};
