const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { getRandomString } = require('../../utils/randomeStr.util');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_KEY
    }
});

const sendEmail = async (req, res) => {
    try {
        const code = await getRandomString(15);

        const templatePath = path.join(__dirname, '../../lib/emailTemplate.html');
        let htmlTemplate = fs.readFileSync(templatePath, 'utf8');

        const mail_html = htmlTemplate.replace('{{code}}', code);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL_TO_SEND_CODE,
            subject: '관리자 페이지 로그인 시도',
            html: mail_html
        };

        await transporter.sendMail(mailOptions);

        return code;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    sendEmail
};