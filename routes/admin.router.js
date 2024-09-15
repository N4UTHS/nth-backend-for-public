const express = require('express');
const router = express.Router();

const { useTokenFilter, otherMethodTokenFilter, loginPageTokenFilter } = require('../middlewares/token.middleware');

const subsidiaryController = require('../controllers/subsidiary.controller');
const loginController = require('../controllers/admin/login.controller');
const announcementController = require('../controllers/announcement.controller');
const imageController = require('../controllers/image.controller');

const { upload } = require('../configs/multer.config');

router.use(`${process.env.ADMIN_URL}${process.env.SUBSIDIARY_API}`, otherMethodTokenFilter);
router.use(`${process.env.ADMIN_URL}${process.env.ANNOUNCEMENT_API}`, otherMethodTokenFilter);

router.get(`${process.env.ADMIN_URL}${process.env.TOKENCHECK_API_A}`, useTokenFilter);
router.get(`${process.env.ADMIN_URL}${process.env.TOKENCHECK_API_B}`, loginPageTokenFilter);
router.get(`${process.env.ADMIN_URL}${process.env.SUBSIDIARY_API}`, subsidiaryController.subsidiaryList);
router.get(`${process.env.ADMIN_URL}${process.env.ANNOUNCEMENT_API}`, announcementController.everyAnnouncements);
router.get(`${process.env.ADMIN_URL}${process.env.ANNOUNCEMENT_API}/update/:id`, announcementController.singleAnnouncement);

router.post(`${process.env.ADMIN_URL}${process.env.LOGIN_API}`, loginController.loginStep1);
router.post(`${process.env.ADMIN_URL}${process.env.SECONDARY_AUTHENTICATION_API}`, loginController.loginStep2);
router.post(`${process.env.ADMIN_URL}${process.env.SUBSIDIARY_API}/create`, subsidiaryController.addSubsidiary);
router.post(`${process.env.ADMIN_URL}${process.env.SUBSIDIARY_API}/update`, subsidiaryController.updateSubsidiary);
router.post(`${process.env.ADMIN_URL}${process.env.SUBSIDIARY_API}/delete`, subsidiaryController.deleteSubsidiary);
router.post(`${process.env.ADMIN_URL}${process.env.ANNOUNCEMENT_API}/create`, upload.single('file'), announcementController.createAnnouncement);
router.post(`${process.env.ADMIN_URL}${process.env.ANNOUNCEMENT_API}/update/:id`, upload.single('file'), announcementController.updateAnnouncement);
router.post(`${process.env.ADMIN_URL}${process.env.ANNOUNCEMENT_API}/delete`, upload.single('file'), announcementController.deleteAnnouncement);
router.post(`${process.env.ADMIN_URL}${process.env.IMAGE_MANAGEMENT_API}/apply`, upload.array('files'), imageController.applyMainPageImages);

module.exports = router;