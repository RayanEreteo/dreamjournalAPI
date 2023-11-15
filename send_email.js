const nodemailer = require("nodemailer")

module.exports = function send_email(receptor, verification_code){
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "rayabf5@gmail.com",
          pass: "vqmg bkxy uuth maqk"
        }
      })
    
      const mailOptions = {
        from: "rayabf5@gmail.com",
        to: receptor,
        subject: "DreamKeeper | Votre lien de vérification",
        text: `Merci de cliquer sur ce lien pour vérifier votre email: http://localhost:5000/verify?code=${verification_code}`
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error)
        }
      })
}