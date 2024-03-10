const transport = require('nodemailer');
async function _sendMail(option) {

    var transportHost = {
        host: process.env.HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.SECURE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    }

    var trans = transport.createTransport(transportHost);

    let mailOptions = {
        from: process.env.EMAIL,
        to: option.to,
        subject: option.subject,
        text: option.text
    }

    const response = await trans.sendMail(
        mailOptions
    )
    console.log(response);
    return response;
}

exports._sendMail = _sendMail