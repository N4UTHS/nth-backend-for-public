const path = require('path');

const generateFileName = (file) => {
    return `${Math.floor(Math.random() * 1000)}-${Date.now()}${path.extname(file.originalname)}`;
};


const generateImageFileName = (file, index) => {
    return `main-page/${index}-${Math.floor(Math.random() * 1000)}-${Date.now()}${path.extname(file.fileName)}`;
};

module.exports = {
    generateFileName,
    generateImageFileName
};
