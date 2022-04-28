import express from 'express';
import { requireAuth } from '@rikwetter/common';
import { Comment } from '../models/comment.js';
import { Tweet } from '../models/tweet.js';

const router = express.Router();

router.get('/api/comments/:tweetId', requireAuth, async (req, res) => {
    const tweetId = req.params.tweetId;

    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
        return res.status(404).send('Not found tweet');
    }

    const comments = await Comment.find({ tweetId: tweetId });

    return res.status(200).send(comments);
})

export { router as showCommentsRouter };