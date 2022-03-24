import express from 'express'
import { body, validationResult } from 'express-validator'
import { User } from '../models/user.js';

const router = express.Router();

router.post('/api/users/signup', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must be between 4 and 20 characters')
    ],
    async (req, res) => {

        const errors = validationResult(req);

        //ToDo add error handling
        if(!errors.isEmpty()){
            // const error = new Error('Invalid email or password')
            // error.reasons = errors.array()
            // throw error;
            console.log(errors)
            return res.send({})
        }

        const { email, password } = req.body
        const existingUser = await User.findOne({email});

        //ToDo add error handling
        if (existingUser) {
            console.log('Email in use');
            // const error =  new Error('Email is in use')
            // error.reasons = {msg: "Email already in use", param: 'email'}
            // throw error
            return res.send({});
        }

        const user = new User({email, password});
        await user.save();

        res.status(201).send(user)

});

export { router as signupRouter };