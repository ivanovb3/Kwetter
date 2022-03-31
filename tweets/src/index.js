import mongoose from 'mongoose'

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
        console.log("Connected to MongoDb tweets")
    } catch (err) {
        console.error(err)
    }

    app.listen(4000, async () => {
        console.log('Listening on port 4000!')
    });
};

start();



