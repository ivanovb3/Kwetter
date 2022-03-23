// const express = require('express')
// const bodyParser = require('body-parser')

import express from 'express'
import bodyParser from 'body-parser'

import { currentUserRouter } from './routes/current-user.js';
import { signinRouter } from './routes/signin.js';
import { signoutRouter } from './routes/signout.js';
import { signupRouter } from './routes/signup.js';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();
app.use(bodyParser.json());

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

app.listen(4000, () => {
    console.log('Listening on port 4000!')
});

