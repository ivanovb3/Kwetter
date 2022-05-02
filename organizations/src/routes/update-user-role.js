import express from 'express';
import { requireAuth, validateRequest } from '@rikwetter/common';
import { body } from 'express-validator';
import { UserOrganizations } from '../models/user-organizations.js'

const router = express.Router();

router.post('/api/organizations/newRole', requireAuth, [
    body('userId')
        .not()
        .isEmpty()
        .withMessage('User id must be provided'),
    body('role')
        .isIn(['USER', 'MODERATOR', 'ADMIN'])
        .withMessage('Role is invalid')
], validateRequest, async (req, res) => {

    const { userId, role } = req.body;
    const currentUser = req.currentUser.id;

    const currentUserDoc = await UserOrganizations.findById(currentUser);
    const user = await UserOrganizations.findById(userId);

    if (!user) {
        return res.sendStatus(404).send('Not found user');
    }

    if (currentUserDoc.role == 'MODERATOR') {
        if (user.role != 'ADMIN') {
            if (role != 'ADMIN') {
                user.role = role;
                await user.save();
                return res.status(200).send(user);
            }
            return res.sendStatus(401).send('Moderator cannot promote user to admin');
        }
        return res.sendStatus(401).send('Moderator cannot touch admins');
    }
    if (currentUserDoc.role == 'ADMIN') {
        user.role = role;
        await user.save();
        return res.status(200).send(user);     
    }

    return res.sendStatus(401).send('User unauthorized');
})

export { router as updateUserRoleRouter };