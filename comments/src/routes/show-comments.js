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
router.post('/api/comments/get', requireAuth, async (req, res) => {
    const { tweetIds } = req.body;

    const comments = await Comment.find({tweetId: {$in: tweetIds}}).sort({createdAt: -1})

    // const tweets = comments.map((o) => o.tweetId)
    // const tweetsUnique = Array.from(new Set(tweets));

    // let toReturn = []
    // for(let i = 0; i < tweetsUnique.length ; i++){
    //     const id = tweetsUnique[i]
    //     let tweetComments = await Comment.find({tweetId: id})
    //     toReturn.push({ id: id, comments: tweetComments })
    // }
    res.status(200).send(comments);

    // res.status(200).send(toReturn);
});

export { router as showCommentsRouter };