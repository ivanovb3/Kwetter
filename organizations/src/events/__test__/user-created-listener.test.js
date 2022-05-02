import { UserCreatedListener } from "../user-created-listener.js";
import { natsWrapper } from "../../nats-wrapper.js"
import { UserOrganizations } from "../../models/user-organizations.js";
import mongoose from "mongoose";
import { jest } from '@jest/globals';


const setup = async () => {
    const listener = new UserCreatedListener(natsWrapper.client, 'user:created', 'organizations-service');

    const data = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    }

    const msg = {
        ack: jest.fn()
    }

    return { listener, data, msg }
}

it('creates a new user on received event', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg);

    const user = await UserOrganizations.findById(data.id);
    expect(user).toBeDefined();
    expect(user.id).toEqual(data.id);
});

it('acks the message', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();
});

it('creates a new user on received event with a role of user', async () => {
    const { listener, data, msg } = await setup()

    await listener.onMessage(data, msg);

    const user = await UserOrganizations.findById(data.id);
    expect(user.role).toEqual('USER');
});