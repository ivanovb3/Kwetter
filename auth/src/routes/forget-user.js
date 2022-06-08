import express from 'express'
import { validateRequest, Publisher, currentUser } from '@rikwetter/common';
import { natsWrapper } from '../nats-wrapper.js';

const router = express.Router();

router.post('/api/users/forgetme', validateRequest, currentUser, async (req, res) => {

    const { id } = req.body;

    if (req.currentUser.id == id) {

        await new Publisher(natsWrapper.client, 'user:deleted').publish({
            id: id
        })

        req.session = null;
    }
    res.send({});
});


export { router as forgetMeRouter };