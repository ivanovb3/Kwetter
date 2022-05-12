import express from 'express'
import { body } from 'express-validator'
import { User } from '../models/user.js';
import { validateRequest, Publisher } from '@rikwetter/common';
import jwt from 'jsonwebtoken'
import { natsWrapper } from '../nats-wrapper.js';
import { Encrypt } from '../services/encrypt.js';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
    ], validateRequest,
    async (req, res) => {

        const { email, password } = req.body
        const encryptedEmail = Encrypt.encrypt(email)
        const existingUser = await User.findOne({email: encryptedEmail});

        if (existingUser) {
            const error =  new Error('Email is in use')
            error.reasons = [{msg: "Email already in use", param: 'email'}]
            throw error
        }

        const user = new User({email, password});
        
        await user.save();

        await new Publisher(natsWrapper.client, 'user:created').publish({   
            id: user.id,
            email: user.email
        })

        //Generate JWT 
        const userJwt = jwt.sign({
            id: user.id
        }, process.env.JWT_KEY);

        //Store it on session object
        req.session.jwt = userJwt

        res.status(201).send(user)

});

export { router as signupRouter };