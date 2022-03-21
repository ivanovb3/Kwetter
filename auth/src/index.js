// const express = require('express')
// const bodyParser = require('body-parser')

import express from 'express'
import bodyParser from 'body-parser'

import { currentUserRouter } from './routes/current-user.js';

const app = express();
app.use(bodyParser.json());

app.use(currentUserRouter);

app.listen(4000, () => {
    console.log('Listening on port 4000!')
});

