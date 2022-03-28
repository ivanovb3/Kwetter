import express from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken';

import { validateRequest } from '@rikwetter/common';
import { User } from '../models/user.js';
import { Password } from '../services/password.js';

const router = express.Router();

router.post('/api/users/signin', [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must enter a password!')
], validateRequest,
    async (req, res) => {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            const error = new Error('User does not exist');
            error.reasons = [{ msg: "User does not exist", param: 'email' }];
            throw error;
        }

        const passwordsMatch = await Password.compare(existingUser.password, password)

        if (!passwordsMatch) {
            const error = new Error('Password incorrect');
            error.reasons = [{ msg: "Incorrect password", param: 'password' }];
            throw error;
        }

        //Generate JWT 
        const userJwt = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, process.env.JWT_KEY);

        //Store it on session object
        req.session.jwt = userJwt

        res.status(200).send(existingUser)

    });

export { router as signinRouter };