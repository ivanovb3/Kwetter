import mongoose from 'mongoose'
import axios from 'axios'

import { app } from './app.js'

const start = async () => {
    if (!process.env.JWT_KEY) {
        console.log('JWT_KEY Missing!')
    }
    if (!process.env.MONGO_URI) {
        console.log('Mongo Uri Missing!')
    }
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDb auth")
    } catch (err) {
        console.error(err)
    }

    app.listen(4000, () => {
        console.log('Listening on port 4000!')
        // axios.get('https://kwetter.com/api/users/currentuser', {
        //     email: 'test@test.com',
        //     password: '12345'
        // })
    });
};

start();



