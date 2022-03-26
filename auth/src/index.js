// const express = require('express')
// const bodyParser = require('body-parser')

import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'

import { currentUserRouter } from './routes/current-user.js';
import { signinRouter } from './routes/signin.js';
import { signoutRouter } from './routes/signout.js';
import { signupRouter } from './routes/signup.js';
import { errorHandler } from './middlewares/error-handler.js';

const app = express();
app.set('trust proxy', true);
app.use(bodyParser.json());
app.use(
    cookieSession({
        signed: false,
        secure: true
    })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
        console.log("Connected to MongoDb")
    } catch (err) {
        console.error(err)
    }

    app.listen(4000, () => {
        console.log('Listening on port 4000!')
    });
};

start();



