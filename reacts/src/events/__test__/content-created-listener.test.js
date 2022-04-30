import { ContentCreatedListener } from "../content-created-listener.js";
import { natsWrapper } from "../../nats-wrapper.js"
import { Content } from "../../models/content.js";
import mongoose from "mongoose";
import { jest } from '@jest/globals';


const setup = async () => {
    const listener = new ContentCreatedListener(natsWrapper.client, 'content:created', 'reacts-service');

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

    const content = await Content.findById(data.id);
    expect(content).toBeDefined();
    expect(content.id).toEqual(data.id);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});