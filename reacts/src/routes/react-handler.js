import express from 'express';
import { requireAuth, validateRequest, Publisher } from '@rikwetter/common';
import { body } from 'express-validator';
import { Tweet } from '../models/tweet.js'
//import { React } from '../models/react.js';

const router = express.Router();

router.post('/api/reacts', requireAuth, [
    body('tweetId')
        .not()
        .isEmpty()
        .withMessage('Tweet id must be provided')
], validateRequest, async (req, res) => {
    //Find tweet to post a comment on
    const { tweetId } = req.body;
    const userId = req.currentUser.id;

    const tweet = await Tweet.findById(tweetId);
    if(!tweet) {
        return res.sendStatus(404).send('Not found tweet');
    }

    const tweetReacts = tweet.reacts;

    if(tweetReacts.includes(userId)){
        tweetReacts.splice(tweetReacts.indexOf(userId), 1)
    }
    else{
        tweetReacts.push(userId);
    }
    tweet.reacts = tweetReacts;
    await tweet.save()

    res.status(201).send(tweet);
})

export { router as reactHandlerRouter };