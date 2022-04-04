import express from 'express'
import { requireAuth, validateRequest, Publisher } from '@rikwetter/common';
import { body } from 'express-validator'
import { Tweet } from '../models/tweet.js';
import { natsWrapper } from '../nats-wrapper.js';

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

    await new Publisher(natsWrapper.client, 'tweet:created').publish({
        id: tweet.id,
        content: tweet.content,
        userId: tweet.userId
    })

    res.status(201).send(tweet);
});

export { router as createTweetRouter }