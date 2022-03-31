import express from 'express'
import { Tweet } from '../models/tweet.js'

const router = express.Router()

router.get('/api/tweets/:id', async (req, res) => {
    const tweet = await Tweet.findById(req.params.id);

    if(!tweet) {
        return res.status(404).send('Not found tweet');
    }

    res.send(tweet);
})

export { router as showTweetRouter };