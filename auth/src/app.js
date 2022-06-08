import express from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
// import cors from 'cors'

import { currentUserRouter } from './routes/current-user.js';
import { signinRouter } from './routes/signin.js';
import { signoutRouter } from './routes/signout.js';
import { signupRouter } from './routes/signup.js';
import { errorHandler } from '@rikwetter/common';

const app = express();
// app.disable("x-powered-by");

app.set('trust proxy', true);
app.use(bodyParser.json());
// app.use(cors())
app.use(
    cookieSession({
        signed: false,
        // secure: process.env.NODE_ENV !== 'test'
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

export { app };