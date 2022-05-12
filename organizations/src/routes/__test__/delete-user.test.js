import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie, getAuthCookieWithId } from '../../test/auth-helper.js';
import mongoose from 'mongoose'
import { UserOrganizations } from '../../models/user-organizations.js';
import { natsWrapper } from '../../nats-wrapper.js'

it('has a route handler listening to /api/organizations/delete for post requests', async () => {
    const response = await request(app)
        .post('/api/organizations/delete')
        .send({})

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/organizations/delete')
        .send({})
        .expect(401)
});

it('can be accessed if the user is signed in', (done) => {
    const response = request(app)
        .post('/api/organizations/delete')
        .set('Cookie', getAuthCookie())
        .send({})
        .end(done)

    expect(response.status).not.toEqual(401);
});

it('returns an error if no userId is specified', async () => {
    const response = await request(app)
        .post('/api/organizations/delete')
        .set('Cookie', getAuthCookie())
        .send({
            userId: ''
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('User id must be provided')
});

it('returns an error if the user does not exist', async () => {
    const userId = mongoose.Types.ObjectId();

    const response = await request(app)
        .post('/api/organizations/delete')
        .set('Cookie', getAuthCookie())
        .send({
            userId: userId
        })
        .expect(404);
})

it('moderator tries to delete another moderator returs unauthorized', async () => {
    const userMod = new UserOrganizations();
    userMod.role = 'MODERATOR';
    await userMod.save();

    const userModerator = new UserOrganizations();
    userModerator.role = 'MODERATOR';
    await userModerator.save();

    const response = await request(app)
        .post('/api/organizations/delete')
        .set('Cookie', getAuthCookieWithId(userMod.id))
        .send({
            userId: userModerator.id
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Moderator cannot delete another user of same or higher rank')
});

it('moderator deletes user emits message to system', async () => {
    const userMod = new UserOrganizations();
    userMod.role = 'MODERATOR';
    await userMod.save();

    const user = new UserOrganizations();
    await user.save();

    const response = await request(app)
        .post('/api/organizations/delete')
        .set('Cookie', getAuthCookieWithId(userMod.id))
        .send({
            userId: user.id
        })
        .expect(200);
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('admin successfully delete mods emits message', async () => {
    const userMod = new UserOrganizations();
    userMod.role = 'MODERATOR';
    await userMod.save();

    const userAdmin = new UserOrganizations();
    userAdmin.role = 'ADMIN';
    await userAdmin.save();

    const response = await request(app)
        .post('/api/organizations/delete')
        .set('Cookie', getAuthCookieWithId(userAdmin.id))
        .send({
            userId: userMod.id
        })
        .expect(200);
    
    expect(natsWrapper.client.publish).toHaveBeenCalled();
});

it('user trying to delete is unauthorized', async () => {
    const user = new UserOrganizations();
    await user.save();

    const userAdmin = new UserOrganizations();
    await userAdmin.save();

    const response = await request(app)
        .post('/api/organizations/delete')
        .set('Cookie', getAuthCookieWithId(user.id))
        .send({
            userId: userAdmin.id
        })
        .expect(400);
    expect(response.body.errors[0].message).toEqual('User unauthorized')
});