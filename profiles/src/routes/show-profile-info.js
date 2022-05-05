import express from 'express'
import { UserProfile } from '../models/user-profile.js'
import { requireAuth } from '@rikwetter/common';

const router = express.Router()

router.get('/api/profiles/:userId', async (req, res) => {
    const user = await UserProfile.findById(req.params.userId);

    if(!user) {
        return res.status(404).send('Not found user');
    }

    res.send(user);
})
router.post('/api/profiles/get', requireAuth, async (req, res) => {
    const { userIds } = req.body;

    const profiles = await UserProfile.find({id: {$in: userIds}})

    res.status(201).send(profiles);
});

export { router as showUserInfoRouter };