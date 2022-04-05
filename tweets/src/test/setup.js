import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from "../app.js";
import { jest } from '@jest/globals';
import { natsWrapper } from '../nats-wrapper.js';

jest.mock('../nats-wrapper.js')
natsWrapper.client = {
    publish: jest.fn().mockImplementation((subject, data, callback) => {
        callback();
    })
}

let mongo;

beforeAll(async () => {
    jest.clearAllMocks();
    process.env.JWT_KEY = 'kwettersecret';
    
    mongo = await MongoMemoryServer.create();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({})
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});