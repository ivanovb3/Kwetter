import express from 'express'
import { Tweet } from '../models/tweet.js'

const router = express.Router()

router.get('/api/tweets', async (req, res) => {
    const tweets = await Tweet.find({})

    res.send(tweets);
})

export { router as showAllTweetsRouter };