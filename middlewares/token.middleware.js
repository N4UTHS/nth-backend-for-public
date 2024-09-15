const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

const useTokenFilter = async (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: '토큰이 없습니다.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        if (decoded.key !== process.env.JWT_STRING) {
            return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
        }

        req.user = decoded;

        return res.status(200).json({ message: '검증 성공' });

    } catch (error) {
        return res.status(401).json({ message: '검증 실패' });
    }
};

const otherMethodTokenFilter = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: '토큰이 없습니다.' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        if (decoded.key !== process.env.JWT_STRING) {
            return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
        }

        req.user = decoded;

        return next();

    } catch (error) {
        return res.status(500).json({ message: '검증 실패' });
    }
};

const loginPageTokenFilter = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(200).json({ message: '없음' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        if (decoded.key !== process.env.JWT_STRING) {
            return res.status(200).json({ message: '없음' });
        }

        req.user = decoded;

        return res.status(200).json({ message: '있음' });

    } catch (error) {
        return res.status(200).json({ message: '없음' });
    }
};

module.exports = {
    useTokenFilter,
    otherMethodTokenFilter,
    loginPageTokenFilter
};