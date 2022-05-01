import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';


import { errorHandler, currentUser } from '@rikwetter/common';
import { uploadPictureRouter } from './routes/new-profile-picture.js';
import { showProfilePictureRouter } from './routes/show-profile-picture.js';
import { updateProfileInfoRouter } from './routes/update-profile-info.js';
import { showUserInfoRouter } from './routes/show-profile-info.js';

const app = express();

app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test'
    })
);
app.use(currentUser);

app.use(uploadPictureRouter);
app.use(showProfilePictureRouter);
app.use(updateProfileInfoRouter);
app.use(showUserInfoRouter);

//app.use(errorHandler);

export { app };