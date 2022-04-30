import express from 'express';
import { requireAuth } from '@rikwetter/common';
import { UserFollowers } from '../models/user-following.js';

const router = express.Router();

router.get('/api/followers', requireAuth, async (req, res) => {

    const currentUser = req.currentUser.id;
    const currentUserDoc = await UserFollowers.findById(currentUser);

    const usersFollowed = currentUserDoc.following;

    res.status(200).send(usersFollowed);
})

router.get('/api/followers/myfollowers', requireAuth, async (req, res) => {

    const currentUser = req.currentUser.id;
    const currentUserDoc = await UserFollowers.findById(currentUser);

    const followers = currentUserDoc.followers;

    res.status(200).send(followers);
})

export { router as showFollowingRouter };