import express from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'


import { errorHandler, currentUser } from '@rikwetter/common';
import { reactHandlerRouter } from './routes/react-handler.js';
import { showReactRouter } from './routes/show-reacts.js';

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

app.use(reactHandlerRouter);
app.use(showReactRouter);

app.use(errorHandler);

export { app };