const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const { getRandomString } = require('../../../utils/randomeStr.util');

const createToken = async () => {
    try {
        const createdAt = Date.now();
        const str1 = await getRandomString(20);
        const str2 = await getRandomString(20);
        const expirationAt = createdAt + (30 * 60 * 1000);

        const payload = {
            createdAt,
            str1,
            key: `${process.env.JWT_STRING}`,
            str2,
            expirationAt
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '30m' });

        return token;

    } catch (error) {
        return null;
    }
};

module.exports = {
    createToken
};