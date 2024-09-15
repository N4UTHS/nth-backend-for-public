const { getFromS3, uploadToS3, deleteFromS3 } = require('../services/admin/aws/S3.service');
const { readSingleAnnouncement, createNewAnnouncement, updateExistingAnnouncement, readAnnouncements, deleteViewsInfo } = require('../services/announcement.service');
const { incrementAnnouncementViews } = require('../services/announcement.service');

const createAnnouncement = async (req, res) => {
    try {
        let s3_key = null;
        let category = null;

        if (req.file) {
            const result = await uploadToS3(req.file);
            s3_key = result.key;
        }

        if (req.body.category) {
            category = req.body.category;
        }

        const { title, main_text, file_name } = req.body;

        await createNewAnnouncement(title, main_text, category, file_name, s3_key);

        res.status(200).json({ message: '업로드 성공', file: req.file || null });

    } catch (error) {
        res.status(500).json({ error: '업로드 실패' });
    }
};

const singleAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const ip = req.ip;
        const announcement = await readSingleAnnouncement(id);

        if (!announcement) {
            return res.status(404).json({ error: '공지사항을 찾을 수 없습니다.' });
        }

        const isViewIncrease = await incrementAnnouncementViews(id, ip);

        if (!isViewIncrease) {
            return res.status(500).json({ error: '조회수 오류' });
        }

        const { s3_key } = announcement;

        if (!s3_key) {
            return res.status(200).json(announcement.toObject());
        }

        try {
            const file = await getFromS3(s3_key);
            if (file && file.Body) {
                const fileBase64 = file.Body.toString('base64');
                const { s3_key: _, ...announcementWithoutS3Key } = announcement.toObject();
                return res.status(200).json({
                    ...announcementWithoutS3Key,
                    file: fileBase64,
                    fileContentType: file.ContentType,
                    fileName: announcement.file_name
                });
            }
        } catch (fileError) {
            return res.status(500).json({ error: '공지사항 불러오기 실패' });
        }

        res.status(200).json(announcement.toObject());

    } catch (error) {
        res.status(500).json({ error: '공지사항 불러오기 실패' });
    }
};

const everyAnnouncements = async (req, res) => {
    try {
        const announcements = await readAnnouncements();

        res.status(200).json(announcements);

    } catch (error) {
        res.status(500).json({ error: '공지사항 불러오기 실패' });
    }
};

const updateAnnouncement = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, main_text, category, existing_file } = req.body;
        const file = req.file;

        const announcement = await readSingleAnnouncement(id);

        if (!announcement) {
            return res.status(404).json({ error: '공지사항을 찾을 수 없습니다.' });
        }

        let s3_key = announcement.s3_key;
        let file_name = announcement.file_name;

        if (file) {
            if (announcement.s3_key) {
                await deleteFromS3(s3_key);
            }

            const result = await uploadToS3(file);
            s3_key = result.key;
            file_name = req.body.file_name;

        } else if (existing_file) {
            const existingFileData = JSON.parse(existing_file);
            s3_key = announcement.s3_key;
            file_name = existingFileData.name;

        } else {
            if (announcement.s3_key) {
                await deleteFromS3(s3_key);
            }

            s3_key = null;
            file_name = null;
        }

        const updatedAnnouncement = await updateExistingAnnouncement(id, {
            title,
            main_text,
            category,
            file_name,
            s3_key
        });

        if (!updatedAnnouncement) {
            return res.status(500).json({ error: '공지사항 업데이트 실패' });
        }

        res.status(200).json({ message: '수정 성공' });

    } catch (error) {
        res.status(500).json({ error: '수정 실패' });
    }
};

const deleteAnnouncement = async (req, res) => {
    try {
        const id = req.body.id;

        const announcement = await readSingleAnnouncement(id);

        if (!announcement) {
            return res.status(404).json({ error: '공지사항을 찾을 수 없습니다.' });
        }

        if (announcement.s3_key) {
            await deleteFromS3(announcement.s3_key);
        }

        await deleteViewsInfo(id);

        await announcement.deleteOne();

        res.status(200).json({ message: '공지사항 삭제 완료' });

    } catch (error) {
        res.status(500).json({ error: '공지사항 삭제 실패' });
    }
};

module.exports = {
    createAnnouncement,
    singleAnnouncement,
    everyAnnouncements,
    updateAnnouncement,
    deleteAnnouncement
};
