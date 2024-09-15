const bcrypt = require('bcryptjs');

const hashing = async (string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedString = await bcrypt.hash(string, salt);

    return hashedString;
};

const compareHashedStrings = async (inputString, compareString) => {
    const isMatch = await bcrypt.compare(inputString, compareString);

    return isMatch;
};

module.exports = {
    hashing,
    compareHashedStrings
};