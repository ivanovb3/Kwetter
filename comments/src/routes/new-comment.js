import express from 'express';
import { requireAuth, validateRequest } from '@rikwetter/common';
import { body } from 'express-validator';
import { Tweet } from '../models/tweet.js'
import { Comment } from '../models/comment.js'

const router = express.Router();

router.post('/api/comments', requireAuth, [
    body('tweetId')
        .not()
        .isEmpty()
        .withMessage('Tweet id must be provided'),
    body('content')
        .not()
        .isEmpty()
        .withMessage('Content must be provided')
], validateRequest, async (req, res) => {
    //Find tweet to post a comment on
    const { tweetId, content } = req.body;
    const userId = req.currentUser.id;

    const tweet = await Tweet.findById(tweetId);
    if(!tweet) {
        return res.status(404).send('Not found tweet');
    }
    //Post comment
    const comment = new Comment({content, userId, tweet})
    await comment.save();
    //Emit to nats

    res.status(201).send(comment);
})

export { router as createCommentsRouter };