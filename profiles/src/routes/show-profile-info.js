import express from 'express'
import { UserProfile } from '../models/user-profile.js'

const router = express.Router()

router.get('/api/profiles/:userId', async (req, res) => {
    const user = await UserProfile.findById(req.params.userId);

    if(!user) {
        return res.status(404).send('Not found user');
    }

    res.send(user);
})

export { router as showUserInfoRouter };