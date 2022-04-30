import express from 'express';
import { requireAuth } from '@rikwetter/common';
import { Content } from '../models/content.js'

const router = express.Router();

router.get('/api/reacts/:contentId', requireAuth, async (req, res) => {
    //Find content to post a comment on
    const contentId = req.params.contentId;

    const content = await Content.findById(contentId);
    if(!content) {
        return res.sendStatus(404).send('Not found content');
    }

    const contentReacts = content.reacts;

    res.status(200).send(contentReacts);
})

export { router as showReactRouter };