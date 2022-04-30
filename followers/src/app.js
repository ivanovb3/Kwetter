import express from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'


import { errorHandler, currentUser } from '@rikwetter/common';
import { followerHandlerRouter } from './routes/follower-handler.js';
import { showFollowingRouter } from './routes/show-following.js';

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

app.use(followerHandlerRouter);
app.use(showFollowingRouter);

app.use(errorHandler);

export { app };