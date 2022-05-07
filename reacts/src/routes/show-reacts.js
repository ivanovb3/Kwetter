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
router.post('/api/reacts/get', requireAuth, async (req, res) => {
    const { contentIds } = req.body;

    const reacts = await Content.find({_id: {$in: contentIds}})

    // const tweets = comments.map((o) => o.tweetId)
    // const tweetsUnique = Array.from(new Set(tweets));

    // let toReturn = []
    // for(let i = 0; i < tweetsUnique.length ; i++){
    //     const id = tweetsUnique[i]
    //     let tweetComments = await Comment.find({tweetId: id})
    //     toReturn.push({ id: id, comments: tweetComments })
    // }
    res.status(200).send(reacts);
});

export { router as showReactRouter };