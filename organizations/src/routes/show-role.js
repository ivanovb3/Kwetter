import express from 'express';
import { requireAuth } from '@rikwetter/common';
import { UserOrganizations } from '../models/user-organizations.js'

const router = express.Router();

router.get('/api/organizations', requireAuth, async (req, res) => {

    const currentUser = req.currentUser.id;

    const currentUserDoc = await UserOrganizations.findById(currentUser);

    res.status(200).send(currentUserDoc);
})

router.get('/api/organizations/get', requireAuth, async (req, res) => {

    const currentUser = req.currentUser.id;

    const users = await UserOrganizations.find({_id: {$ne: currentUser}});

    res.status(200).send(users);
})

export { router as showUserRoleRouter };