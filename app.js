require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { mongoDB } = require('./_configs/database.config');
const mainPageRouter = require('./_routes/mainPage.router');
const adminRouter = require('./_routes/admin.router');
const subsidiaryRouter = require('./_routes/subsidiary.router');
const announcementRouter = require('./_routes/announcement.router');

const app = express();

app.use(cors({
  origin: process.env.EXPRESS_PUBLIC_API_URL,
  credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`${process.env.MAIN_URL_START}`, mainPageRouter);
app.use(`${process.env.ADMIN_URL_START}`, adminRouter);
app.use(`${process.env.SUBSIDIARY_URL_START}`, subsidiaryRouter);
app.use(`${process.env.ANNOUNCEMENT_URL_START}`, announcementRouter);

mongoDB();

app.listen(process.env.SERVER_PORT, process.env.SERVER_IP_OPTION);