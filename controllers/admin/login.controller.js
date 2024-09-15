const { accessVerification } = require('../../services/admin/login/login.service');
const { sendEmail } = require('../../services/admin/mail.service');
const { saveCode, authCode } = require('../../services/admin/login/code.service');
const { createToken } = require('../../services/admin/login/jwt.service');

const loginStep1 = async (req, res) => {
    try {
        const email = req.body.username;
        const password = req.body.password;

        const verificationAdminAccount = await accessVerification(email, password);

        if (!verificationAdminAccount) {
            return res.status(500).json({ message: '로그인 실패' });
        }

        const code = await sendEmail(req, res);

        if (!code) {
            return res.status(500).json({ message: '이메일 전송 실패' });
        }

        const savedCode = await saveCode(code);

        if (!savedCode) {
            return res.status(500).json({ message: '로그 저장 실패' });
        }

        return res.status(200).json({ message: '1차 성공' });

    } catch (error) {
        if (!res.headersSent) {
            return res.status(500).json({ message: '서버 오류' });
        }
    }
};

const loginStep2 = async (req, res) => {
    try {
        const code = req.body.authCode;

        const codeMatch = await authCode(code);

        if (!codeMatch) {
            return res.status(500).json({ message: '코드 검증 실패' });
        }

        const tokenForCookie = await createToken();

        if (!tokenForCookie) {
            return res.status(500).json({ message: '토큰 생성 실패' });
        }

        res.cookie('token', tokenForCookie, {
            httpOnly: true,
            secure: false, // http는 내부 통신
            maxAge: 30 * 60 * 1000,
            path: `${process.env.COOKIE_URL_START}${process.env.ADMIN_URL}`,
            sameSite: 'lax'
        });

        return res.status(200).json({ message: '로그인 성공' });

    } catch (error) {
        if (!res.headersSent) {
            return res.status(500).json({ message: '서버 오류' });
        }
    }
};

module.exports = {
    loginStep1,
    loginStep2
};
