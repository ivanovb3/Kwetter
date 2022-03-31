import express from 'express'
import { body } from 'express-validator'
import { validateRequest, requireAuth } from '@rikwetter/common'
import { Tweet } from '../models/tweet.js'

const router = express.Router();

router.put('/api/tweets/:id', requireAuth, [
    body('content')
        .not()
        .isEmpty()
        .withMessage('Content must be provided')
], validateRequest, async (req, res) => {
    const tweet = await Tweet.findById(req.params.id)

    if (!tweet) {
        res.status(404).send('Not found tweet');
    }

    if (tweet.userId !== req.currentUser.id) {
        res.status(401).send('Not authorized');
    }

    tweet.set({
        content: req.body.content
    });

    await tweet.save();

    res.send(tweet)
})

export { router as updateTweetRouter }