const Verification = require('../../../models/verification.model');

const saveCode = async (code) => {
    try {
        const savedCode = await Verification.create({ code });

        deleteCode(savedCode._id, 120000);

        if (!savedCode) {
            throw new Error('Notification create fail');
        }

        return savedCode;

    } catch (error) {
        throw error;
    }
};

const authCode = async (code) => {
    try {
        const isCodeExist = await Verification.findOne({ code });

        if (!isCodeExist) {
            return false;
        }

        deleteCode(isCodeExist._id, 0);

        return true;

    } catch (error) {
        throw error;
    }
};

const deleteCode = async (id, delay) => {
    setTimeout(async () => {
        try {
            await Verification.deleteOne({ _id: id });

        } catch (error) {
            throw error;
        }
    }, delay);
};

module.exports = {
    saveCode,
    authCode
};