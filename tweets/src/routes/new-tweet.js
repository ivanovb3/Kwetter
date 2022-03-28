import express from 'express'
import { requireAuth } from '@rikwetter/common';

const router = express.Router();

router.post('/api/tweets', requireAuth, (req, res) => {
    res.sendStatus(200);
});

export { router as createTweetRouter }