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
            const error = new Error('Moderator cannot promote user to admin');
            error.reasons = [{ msg: "Moderator cannot promote user to admin", param: 'modify' }];
            throw error;
        }
        const error = new Error('Moderator cannot touch admins');
        error.reasons = [{ msg: "Moderator cannot touch admins", param: 'modify' }];
        throw error;
    }
    if (currentUserDoc.role == 'ADMIN') {
        user.role = role;
        await user.save();
        return res.status(200).send(user);
    }

    return res.sendStatus(401).send('User unauthorized');
})

router.post('/api/organizations/initial', requireAuth, [
    body('userId')
        .not()
        .isEmpty()
        .withMessage('User id must be provided')
], validateRequest, async (req, res) => {

    const { userId } = req.body;

    const user = await UserOrganizations.findById(userId);

    if (!user) {
        return res.sendStatus(404).send('Not found user');
    }
    
    user.role = 'ADMIN';
    await user.save();
    return res.status(200).send(user);

})

export { router as updateUserRoleRouter };