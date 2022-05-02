import express from 'express'
import 'express-async-errors'
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'

import { errorHandler, currentUser } from '@rikwetter/common';
import { updateUserRoleRouter } from './routes/update-user-role.js';
import { deleteUserRoleRouter } from './routes/delete-user.js';
import { showUserRoleRouter } from './routes/show-role.js';

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

app.use(updateUserRoleRouter);
app.use(deleteUserRoleRouter);
app.use(showUserRoleRouter);

app.use(errorHandler);

export { app };