const Announcement = require('../models/announcement.model');
const View = require('../models/view.model');
const mongoose = require('mongoose');

const readAnnouncements = async () => {
    try {
        const announcements = await Announcement.find();

        if (!announcements) {
            throw new Error('Announcements not found');
        }

        return announcements;

    } catch (error) {
        throw error;
    }
};

const readSingleAnnouncement = async (id) => {
    try {
        const announcement = await Announcement.findById(id);

        if (!announcement) {
            throw new Error('announcement not found');
        }

        return announcement;

    } catch (error) {
        throw error;
    }
};

const createNewAnnouncement = async (title, main_text, category, file_name, s3_key) => {
    try {
        const newAnnouncement = await Announcement.create({
            title, main_text, category, file_name, s3_key
        });

        if (!newAnnouncement) {
            throw new Error('Announcement create fail');
        }

    } catch (error) {
        throw error;
    }
};

const updateExistingAnnouncement = async (id, updateData) => {
    try {
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            id,
            { ...updateData, is_updated: true },
            { new: true }
        );

        if (!updatedAnnouncement) {
            throw new Error('Announcement update fail');
        }

        return updatedAnnouncement;

    } catch (error) {
        throw error;
    }
};

const incrementAnnouncementViews = async (announcementId, ip) => {
    const now = new Date();
    const roundedDate = new Date(Math.floor(now.getTime() / 600000) * 600000);

    const session = await View.startSession();
    session.startTransaction();

    try {
        const existingView = await View.findOne({
            announcementId: announcementId,
            ip: ip,
            viewedAt: roundedDate
        }).session(session);

        if (!existingView) {
            await View.create([{
                announcementId: announcementId,
                ip: ip,
                viewedAt: roundedDate
            }], { session });

            await Announcement.findByIdAndUpdate(
                announcementId,
                { $inc: { views: 1 } }
            ).session(session);
        }

        await session.commitTransaction();
        session.endSession();

        return true;

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return false;
    }
};

const deleteViewsInfo = async (id) => {
    try {
        const viewObjectId = new mongoose.Types.ObjectId(id);

        await View.deleteMany({ announcementId: viewObjectId });

    } catch (error) {
        throw error;
    }
};

module.exports = {
    readAnnouncements,
    readSingleAnnouncement,
    createNewAnnouncement,
    updateExistingAnnouncement,
    incrementAnnouncementViews,
    deleteViewsInfo
};
