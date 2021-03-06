import express from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'


import { errorHandler, currentUser } from '@rikwetter/common';
import { createCommentsRouter } from './routes/new-comment.js';
import { showCommentsRouter } from './routes/show-comments.js';

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

app.use(createCommentsRouter);
app.use(showCommentsRouter);

app.use(errorHandler);

export { app };