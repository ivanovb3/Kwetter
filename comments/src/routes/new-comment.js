import express from 'express';
import { requireAuth, validateRequest, Publisher } from '@rikwetter/common';
import { body } from 'express-validator';
import { Tweet } from '../models/tweet.js'
import { Comment } from '../models/comment.js'
import { natsWrapper } from '../nats-wrapper.js';

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
    const comment = new Comment({content, userId, tweetId})
    await comment.save();

    //Emit to nats
    await new Publisher(natsWrapper.client, 'comment:created').publish({   
        id: comment.id,
        content: comment.content,
        userId: comment.userId,
        tweetId: comment.tweetId
    })

    res.status(201).send(comment);
})

export { router as createCommentsRouter };