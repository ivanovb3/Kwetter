import express from 'express';
import { requireAuth, validateRequest, Publisher } from '@rikwetter/common';
import { body } from 'express-validator';
import { UserOrganizations } from '../models/user-organizations.js'
import { natsWrapper } from '../nats-wrapper.js'

const router = express.Router();

router.post('/api/organizations/delete', requireAuth, [
    body('userId')
        .not()
        .isEmpty()
        .withMessage('User id must be provided')
], validateRequest, async (req, res) => {

    const { userId } = req.body;
    const currentUser = req.currentUser.id;

    const currentUserDoc = await UserOrganizations.findById(currentUser);
    const user = await UserOrganizations.findById(userId);

    if (!user) {
        return res.sendStatus(404).send('Not found user');
    }

    if (currentUserDoc.role == 'MODERATOR') {
        if (user.role == 'USER') {
            await new Publisher(natsWrapper.client, 'user:deleted').publish({   
                id: userId                
            })
            await UserOrganizations.deleteOne({_id: userId})
            console.log(`User of id: ${userId} should be deleted`);
            return res.status(200).send({});
        }
        //return res.sendStatus(401).send('Moderator cannot delete another user of same or higher rank');
        const error = new Error('Moderator cannot delete another user of same or higher rank');
        error.reasons = [{ msg: "Moderator cannot delete another user of same or higher rank", param: 'delete' }];
        throw error;
    }
    if (currentUserDoc.role == 'ADMIN') {
        await new Publisher(natsWrapper.client, 'user:deleted').publish({   
            id: userId                
        })
        await UserOrganizations.deleteOne({_id: userId});
        console.log(`User of id: ${userId} should be deleted`);   
        return res.status(200).send({});
    }
    const error = new Error('User unauthorized');
    error.reasons = [{ msg: "User unauthorized", param: 'delete' }];
    throw error;
})

export { router as deleteUserRoleRouter };