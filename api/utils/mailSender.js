const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  host: 'smtp-relay.sendinblue.com',
  port: '587',
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'ventas@mayorio.com', // generated user
    pass: '8k5drw09sv2Sat4U' // generated password
  }
})

module.exports = {
    async sendEmail(mailOptions) {
        // send mail with defined transport object
        let info = await transporter.sendMail(mailOptions)
        return info
    }
}
