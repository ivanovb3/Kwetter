import express from 'express';
import { requireAuth } from '@rikwetter/common';
import { Comment } from '../models/comment.js';

const router = express.Router();

router.get('api/comments', requireAuth, async (req, res) => {
    res.send({});
})

export { router as showCommentsRouter };