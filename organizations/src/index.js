import mongoose from 'mongoose';
import { app } from './app.js';
import { UserCreatedListener } from './events/user-created-listener.js';
import { UserDeletedListener } from './events/user-deleted-listener.js';
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

        process.on('SIGINT', () => natsWrapper.client.close());
        process.on('SIGTERM', () => natsWrapper.client.close());

        new UserCreatedListener(natsWrapper.client, 'user:created', 'organizations-service').listen();
        new UserDeletedListener(natsWrapper.client, 'user:deleted', 'organizations-service').listen();

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDb organizations");
    } catch (err) {
        console.error(err)
    }

    app.listen(4000, async () => {
        console.log('Listening on port 4000!')
    });
};

start();



