import express from 'express';
import { requireAuth } from '@rikwetter/common';
import { UserProfile } from '../models/user-profile.js';

const router = express.Router();

router.get('/api/profiles/picture/:userId', requireAuth, async (req, res) => {
    //Find content to post a comment on
    const userId = req.params.userId;

    const user = await UserProfile.findById(userId);
    if(!user) {
        return res.sendStatus(404).send('Not found user');
    }

    const url = user.pictureURL;

    res.status(200).send(url);
})

export { router as showProfilePictureRouter };