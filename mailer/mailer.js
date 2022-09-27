const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: "francesca.howell64@ethereal.email",
        pass: '1GKBq27swN2228NXE9'
    }
});
module.exports = transporter
