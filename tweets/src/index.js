import mongoose from 'mongoose';
import { app } from './app.js';
import { natsWrapper } from './nats-wrapper.js';

const start = async () => {
    if (!process.env.JWT_KEY) {
        console.log('JWT_KEY Missing!!');
    }
    if (!process.env.MONGO_URI) {
        console.log('Mongo Uri Missing!');
    }

    try {
        await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL);

        natsWrapper.client.on('close', () => {
            console.log('NATS connection closed!');
            process.exit();
        })

        process.on('SiGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

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



