import express from 'express';
import { requireAuth, validateRequest, Publisher } from '@rikwetter/common';
import { Tweet } from '../models/tweet.js'

const router = express.Router();

router.get('/api/reacts/:tweetId', requireAuth, async (req, res) => {
    //Find tweet to post a comment on
    const tweetId = req.params.tweetId;

    const tweet = await Tweet.findById(tweetId);
    if(!tweet) {
        return res.sendStatus(404).send('Not found tweet');
    }

    const tweetReacts = tweet.reacts;

    res.status(200).send(tweetReacts);
})

export { router as showReactRouter };