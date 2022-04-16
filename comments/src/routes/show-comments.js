import express from 'express';
import { requireAuth } from '@rikwetter/common';
import { Comment } from '../models/comment.js';

const router = express.Router();

router.get('/api/comments/:tweetId', requireAuth, async (req, res) => {
    const tweetId = req.params.tweetId;

    const comments = await Comment.find({ tweetId: tweetId });

    return res.status(200).send(comments);
})

export { router as showCommentsRouter };