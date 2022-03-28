import express from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'


import { errorHandler, currentUser, requireAuth } from '@rikwetter/common';
import { createTweetRouter } from './routes/new-tweet.js';

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
app.use(requireAuth);
app.use(createTweetRouter);

app.use(errorHandler);

export { app };