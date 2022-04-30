import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie, getAuthCookieWithId } from '../../test/auth-helper.js';
import { natsWrapper } from '../../nats-wrapper.js'
import mongoose from 'mongoose'
import { UserFollowers } from '../../models/user-following.js';

it('has a route handler listening to /api/followers for post requests', async () => {
    const response = await request(app)
        .post('/api/followers')
        .send({})

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/followers')
        .send({})
        .expect(401)
});

it('can be accessed if the user is signed in', (done) => {
    const response = request(app)
        .post('/api/followers')
        .set('Cookie', getAuthCookie())
        .send({})
        .end(done)

    expect(response.status).not.toEqual(401);
});

it('returns an error if no userId is specified', async () => {
    const response = await request(app)
        .post('/api/followers')
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
        .post('/api/followers')
        .set('Cookie', getAuthCookie())
        .send({
            userId: userId
        })
        .expect(404);
})

it('sucessfully one user follows another', async () => {
    const user = new UserFollowers();
    await user.save()
    expect(user.following.length).toEqual(0);
    expect(user.followers.length).toEqual(0);

    const userToBeFollowed = new UserFollowers();
    await userToBeFollowed.save()

    expect(userToBeFollowed.following.length).toEqual(0);
    expect(userToBeFollowed.followers.length).toEqual(0);

    const response = await request(app)
        .post('/api/followers')
        .set('Cookie', getAuthCookieWithId(user.id))
        .send({
            userId: userToBeFollowed.id
        })
        .expect(201);

    expect(response.body.following.length).toEqual(1);
    expect(response.body.followers.length).toEqual(0);
});

it('sucessfully one user unfollowes another', async () => {
    const user = new UserFollowers();
    await user.save()
    expect(user.following.length).toEqual(0);
    expect(user.followers.length).toEqual(0);

    const userToBeFollowed = new UserFollowers();
    await userToBeFollowed.save()

    expect(userToBeFollowed.following.length).toEqual(0);
    expect(userToBeFollowed.followers.length).toEqual(0);

    const response = await request(app)
        .post('/api/followers')
        .set('Cookie', getAuthCookieWithId(user.id))
        .send({
            userId: userToBeFollowed.id
        })
        .expect(201);

    expect(response.body.following.length).toEqual(1);
    expect(response.body.followers.length).toEqual(0);

    const responseUnfollow = await request(app)
        .post('/api/followers')
        .set('Cookie', getAuthCookieWithId(user.id))
        .send({
            userId: userToBeFollowed.id
        })
        .expect(201);

    expect(responseUnfollow.body.following.length).toEqual(0);
    expect(responseUnfollow.body.followers.length).toEqual(0);
});