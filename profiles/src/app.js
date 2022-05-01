import express from 'express';
import 'express-async-errors';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import fileupload from "express-fileupload";


import { errorHandler, currentUser } from '@rikwetter/common';
import { uploadPictureRouter } from './routes/new-profile-picture.js';
import { showProfilePictureRouter } from './routes/show-profile-picture.js';

const app = express();
// app.use(fileupload());

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

//app.use(errorHandler);

export { app };