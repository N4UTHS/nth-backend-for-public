const { compareHashedStrings } = require('../../../utils/hash.util');

const accessVerification = async (email, password) => {
    try {
        const adminEmail = process.env.SUPER_ADMIN_ID;
        const isEmailMatch = await compareHashedStrings(email, adminEmail);

        if (!isEmailMatch) {
            return false;
        }

        const adminPassword = process.env.SUPER_ADMIN_PS;
        const isPasswordMatch = await compareHashedStrings(password, adminPassword);

        if (!isPasswordMatch) {
            return false;
        }

        return true;

    } catch (error) {
        throw error;
    }
};

module.exports = {
    accessVerification
};