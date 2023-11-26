const nodemailer = require("nodemailer")

module.exports = function send_email(receptor, verification_code){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_MAIL,
          pass: process.env.GMAIL_PASS
        }
      })
    
      const mailOptions = {
        from: process.env.GMAIL_MAIL,
        to: receptor,
        subject: "DreamKeeper | Votre lien de vérification",
        text: `Merci de cliquer sur ce lien pour vérifier votre email: https://dreamkeeper-service.onrender.com/passupdate/verify?code=${verification_code}`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
        }
      })
}