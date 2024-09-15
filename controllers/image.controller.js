const { uploadToS3ForMainPageImages, getArrayFromS3, deleteFolderFromS3 } = require("../services/admin/aws/S3.service");

const applyMainPageImages = async (req, res) => {
    try {
        await deleteFolderFromS3('main-page/');

        const files = req.files;

        const images = files.map((file, index) => ({
            buffer: file.buffer,
            fileName: file.originalname,
            index: index
        }));

        const uploadResults = await uploadToS3ForMainPageImages(images);

        res.status(200).json({ message: '이미지 업로드 성공', results: uploadResults });

    } catch (error) {
        res.status(500).json({ message: '이미지 업로드 실패' });
    }
};

const loadMainPageImages = async (req, res) => {
    try {
        const images = await getArrayFromS3('main-page/');

        if (!images) {
            throw error;
        }

        res.status(200).json(images);

    } catch (error) {
        res.status(500).json({ message: '메인화면 이미지 불러오기 실패' });
    }
};

module.exports = {
    applyMainPageImages,
    loadMainPageImages
};
