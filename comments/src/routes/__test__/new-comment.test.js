import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie } from '../../test/auth-helper.js';
import { Tweet } from '../../models/tweet.js'
// import { Comment } from '../../models/comment.js';
import { natsWrapper } from '../../nats-wrapper.js'
import mongoose from 'mongoose'

it('has a route handler listening to /api/comments for post requests', async () => {
    const response = await request(app)
        .post('/api/comments')
        .send({})

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/comments')
        .send({})
        .expect(401)
});

it('can be accessed if the user is signed in', (done) => {
    const response = request(app)
        .post('/api/comments')
        .set('Cookie', getAuthCookie())
        .send({})
        .end(done)

    expect(response.status).not.toEqual(401);
});

it('returns an error if empty comment is provided', async () => {
    const response = await request(app)
        .post('/api/comments')
        .set('Cookie', getAuthCookie())
        .send({
            content: '',
            tweetId: '121af'
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Content must be provided')
});
it('returns an error if no tweet is specified', async () => {
    const response = await request(app)
        .post('/api/comments')
        .set('Cookie', getAuthCookie())
        .send({
            content: 'This is a comment',
            tweetId: ''
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Tweet id must be provided')
});

it('returns an error if the tweet does not exist', async () => {
    const tweetId = mongoose.Types.ObjectId();

    await request(app)
        .post('/api/comments')
        .set('Cookie', getAuthCookie())
        .send({
            content: 'This is a comment',
            tweetId: tweetId
        })
        .expect(404);
})

it('creates a new comment', async () => {
    const tweet = new Tweet()
    await tweet.save()

    const response = await request(app)
        .post('/api/comments')
        .set('Cookie', getAuthCookie())
        .send({
            content: 'This is a comment',
            tweetId: tweet.id
        })
        .expect(201);

});

it('publishes an event', async () => {
    const tweet = new Tweet()
    await tweet.save()

    await request(app)
        .post('/api/comments')
        .set('Cookie', getAuthCookie())
        .send({
            content: 'This is a comment',
            tweetId: tweet.id
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})