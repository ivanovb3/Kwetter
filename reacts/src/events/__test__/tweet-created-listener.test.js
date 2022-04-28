import { TweetCreatedListener } from "../tweet-created-listener.js";
import { natsWrapper } from "../../nats-wrapper.js"
import { Tweet } from "../../models/tweet.js";
import mongoose from "mongoose";
import { jest } from '@jest/globals';


const setup = async () => {
    const listener = new TweetCreatedListener(natsWrapper.client, 'tweet:created', 'comments-service');

    const data = {
        id: new mongoose.Types.ObjectId().toHexString(),
        content: 'This is a tweet',
        userId: new mongoose.Types.ObjectId().toHexString()
    }

    const msg = {
        ack: jest.fn()
    }

    return { listener, data, msg }
}

it('creates a new tweet on received event', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg);

    const tweet = await Tweet.findById(data.id);
    expect(tweet).toBeDefined();
    expect(tweet.id).toEqual(data.id);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});