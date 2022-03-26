import express from 'express'
import { body } from 'express-validator'
import { User } from '../models/user.js';
import { validateRequest } from '../middlewares/validate-request.js';
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
    ], validateRequest,
    async (req, res) => {

        const { email, password } = req.body
        const existingUser = await User.findOne({email});

        if (existingUser) {
            const error =  new Error('Email is in use')
            error.reasons = [{msg: "Email already in use", param: 'email'}]
            throw error
        }

        const user = new User({email, password});
        await user.save();

        //Generate JWT 
        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY);

        //Store it on session object
        req.session.jwt = userJwt

        res.status(201).send(user)

});

export { router as signupRouter };