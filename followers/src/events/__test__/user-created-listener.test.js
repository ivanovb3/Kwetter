import { UserCreatedListener } from "../user-created-listener.js";
import { natsWrapper } from "../../nats-wrapper.js"
import { UserFollowers } from "../../models/user-following.js";
import mongoose from "mongoose";
import { jest } from '@jest/globals';


const setup = async () => {
    const listener = new UserCreatedListener(natsWrapper.client, 'user:created', 'followers-service');

    const data = {
        id: new mongoose.Types.ObjectId().toHexString(),
        content: 'This is a content',
        userId: new mongoose.Types.ObjectId().toHexString()
    }

    const msg = {
        ack: jest.fn()
    }

    return { listener, data, msg }
}

it('creates a new content on received event', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg);

    const user = await UserFollowers.findById(data.id);
    expect(user).toBeDefined();
    expect(user.id).toEqual(data.id);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});