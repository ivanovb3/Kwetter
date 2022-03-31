import express from 'express'
import { requireAuth, validateRequest } from '@rikwetter/common';
import { body } from 'express-validator'
import { Tweet } from '../models/tweet.js';

const router = express.Router();

router.post('/api/tweets', requireAuth, [
    body('content')
        .not()
        .isEmpty()
        .withMessage('Content must be provided')
], validateRequest, async (req, res) => {
    const { content } = req.body;
    const userId = req.currentUser.id;

    const tweet = new Tweet({content, userId});
    await tweet.save();

    res.status(201).send(tweet);
});

export { router as createTweetRouter }