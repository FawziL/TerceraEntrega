const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'percy8@ethereal.email',
        pass: 'eFhDdZ11Z71MdcrGe7'
    }
});
module.exports = transporter
