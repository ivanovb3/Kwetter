import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie, getAuthCookieWithId } from '../../test/auth-helper.js';
import mongoose from 'mongoose'
import { UserOrganizations } from '../../models/user-organizations.js';

it('has a route handler listening to /api/organizations/newRole for post requests', async () => {
    const response = await request(app)
        .post('/api/organizations/newRole')
        .send({})

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/organizations/newRole')
        .send({})
        .expect(401)
});

it('can be accessed if the user is signed in', (done) => {
    const response = request(app)
        .post('/api/organizations/newRole')
        .set('Cookie', getAuthCookie())
        .send({})
        .end(done)

    expect(response.status).not.toEqual(401);
});

it('returns an error if no userId is specified', async () => {
    const response = await request(app)
        .post('/api/organizations/newRole')
        .set('Cookie', getAuthCookie())
        .send({
            userId: ''
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('User id must be provided')
});

it('returns an error if no role is specified', async () => {
    const response = await request(app)
        .post('/api/organizations/newRole')
        .set('Cookie', getAuthCookie())
        .send({
            userId: '12312344',
            role: ''
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Role is invalid')
});

it('returns an error if the role is invalid', async () => {
    const response = await request(app)
        .post('/api/organizations/newRole')
        .set('Cookie', getAuthCookie())
        .send({
            userId: '12312344',
            role: 'admina'
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Role is invalid')
});

it('returns an error if the user does not exist', async () => {
    const userId = mongoose.Types.ObjectId();

    const response = await request(app)
        .post('/api/organizations/newRole')
        .set('Cookie', getAuthCookie())
        .send({
            userId: userId,
            role: 'MODERATOR'
        })
        .expect(404);
    //console.log(response.error)
})

it('moderator tries to touch admin returs 401', async () => {
    const userMod = new UserOrganizations();
    userMod.role = 'MODERATOR';
    await userMod.save();

    const userAdmin = new UserOrganizations();
    userAdmin.role = 'ADMIN';
    await userAdmin.save();

    const response = await request(app)
        .post('/api/organizations/newRole')
        .set('Cookie', getAuthCookieWithId(userMod.id))
        .send({
            userId: userAdmin.id,
            role: 'USER'
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Moderator cannot touch admins')
});

it('moderator tries to promote user to admin returs 401', async () => {
    const userMod = new UserOrganizations();
    userMod.role = 'MODERATOR';
    await userMod.save();

    const user = new UserOrganizations();
    await user.save();

    const response = await request(app)
        .post('/api/organizations/newRole')
        .set('Cookie', getAuthCookieWithId(userMod.id))
        .send({
            userId: user.id,
            role: 'ADMIN'
        })
        .expect(400);
    expect(response.body.errors[0].message).toEqual('Moderator cannot promote user to admin')
});

it('moderator successfully promotes user to mod', async () => {
    const userMod = new UserOrganizations();
    userMod.role = 'MODERATOR';
    await userMod.save();

    const user = new UserOrganizations();
    await user.save();

    const response = await request(app)
        .post('/api/organizations/newRole')
        .set('Cookie', getAuthCookieWithId(userMod.id))
        .send({
            userId: user.id,
            role: 'MODERATOR'
        })
        .expect(200);
    expect(response.body.role).toEqual('MODERATOR');
});

it('admin successfully promotes mod to admin', async () => {
    const userMod = new UserOrganizations();
    userMod.role = 'MODERATOR';
    await userMod.save();

    const userAdmin = new UserOrganizations();
    userAdmin.role = 'ADMIN';
    await userAdmin.save();

    const response = await request(app)
        .post('/api/organizations/newRole')
        .set('Cookie', getAuthCookieWithId(userAdmin.id))
        .send({
            userId: userMod.id,
            role: 'ADMIN'
        })
        .expect(200);
    expect(response.body.role).toEqual('ADMIN');
});

it('user trying to update is unauthorized', async () => {
    const user = new UserOrganizations();
    await user.save();

    const userAdmin = new UserOrganizations();
    await userAdmin.save();

    const response = await request(app)
        .post('/api/organizations/newRole')
        .set('Cookie', getAuthCookieWithId(user.id))
        .send({
            userId: userAdmin.id,
            role: 'USER'
        })
        .expect(400);
    expect(response.body.errors[0].message).toEqual('User unauthorized')
});