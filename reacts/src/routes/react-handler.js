import express from 'express';
import { requireAuth, validateRequest, Publisher } from '@rikwetter/common';
import { body } from 'express-validator';
import { Content } from '../models/content.js'

const router = express.Router();

router.post('/api/reacts', requireAuth, [
    body('contentId')
        .not()
        .isEmpty()
        .withMessage('Content id must be provided')
], validateRequest, async (req, res) => {
    //Find content to post a comment on
    const { contentId } = req.body;
    const userId = req.currentUser.id;

    const content = await Content.findById(contentId);
    if(!content) {
        return res.sendStatus(404).send('Not found content');
    }

    const contentReacts = content.reacts;

    if(contentReacts.includes(userId)){
        contentReacts.splice(contentReacts.indexOf(userId), 1)
    }
    else{
        contentReacts.push(userId);
    }
    content.reacts = contentReacts;
    await content.save()

    res.status(201).send(content);
})

export { router as reactHandlerRouter };