import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie } from '../../test/auth-helper.js';
import { Tweet } from '../../models/tweet.js'
import { natsWrapper } from '../../nats-wrapper.js'

it('has a route handler listening to /api/tweets for post requests', async () => {
    const response = await request(app)
        .post('/api/tweets')
        .send({})

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/tweets')
        .send({})
        .expect(401)
});

it('can be accessed if the user is signed in', () => {
    const response = request(app)
        .post('/api/tweets')
        .set('Cookie', getAuthCookie())
        .send({})

    expect(response.status).not.toEqual(401);
});

it('returns an error if empty tweet is provided', async () => {
    const response = await request(app)
        .post('/api/tweets')
        .set('Cookie', getAuthCookie())
        .send({
            content: ''
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Content must be provided')
});

it('creates a new ticket', async () => {
    let tweets = await Tweet.find({});
    expect(tweets.length).toEqual(0);

    const content = 'This is a tweet'

    const response = await request(app)
        .post('/api/tweets')
        .set('Cookie', getAuthCookie())
        .send({
            content: content
        })
        .expect(201);

    tweets = await Tweet.find({});
    expect(tweets.length).toEqual(1);
    expect(tweets[0].content).toEqual(content)

});

it('publishes an event', async () => {
    const content = 'This is a tweet'

    const response = await request(app)
        .post('/api/tweets')
        .set('Cookie', getAuthCookie())
        .send({
            content: content
        })
        .expect(201);

    expect(natsWrapper.client.publish).toHaveBeenCalled();
})