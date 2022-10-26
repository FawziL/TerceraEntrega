const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'melvin.keeling@ethereal.email',
        pass: 'vEehYj2utbCp4c6c7J'
    }
});
module.exports = transporter
