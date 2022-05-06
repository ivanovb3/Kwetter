import express from 'express'
import { Tweet } from '../models/tweet.js'
import { requireAuth } from '@rikwetter/common';

const router = express.Router()

router.get('/api/tweets', async (req, res) => {
    const tweets = await Tweet.find({})

    res.send(tweets);
})

router.post('/api/tweets/get', requireAuth, async (req, res) => {
    const { userIds } = req.body;

    const tweets = await Tweet.find({userId: {$in: userIds}})

    res.status(200).send(tweets);
});

export { router as showAllTweetsRouter };