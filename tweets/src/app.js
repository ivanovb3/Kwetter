import express from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'


import { errorHandler, currentUser } from '@rikwetter/common';
import { createTweetRouter } from './routes/new-tweet.js';
import { showTweetRouter } from './routes/show-tweet.js';
import { showAllTweetsRouter } from './routes/show-all-tweets.js';
import { updateTweetRouter } from './routes/update-tweet.js';

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

app.use(showTweetRouter);
app.use(createTweetRouter);
app.use(showAllTweetsRouter);
app.use(updateTweetRouter);

app.use(errorHandler);

export { app };