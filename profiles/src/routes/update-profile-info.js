import express from 'express'
import { requireAuth } from '@rikwetter/common';
import { UserProfile } from '../models/user-profile.js';

const router = express.Router();

router.post('/api/profiles', requireAuth, async (req, res) => {

    const { name, bio } = req.body

    const user = await UserProfile.findById(req.currentUser.id);

    user.set({
        name: name,
        bio: bio
    })

    await user.save();

    return res.status(200).send(`User updated ${user}`);
});


export { router as updateProfileInfoRouter }