import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie, getAuthCookieWithId } from '../../test/auth-helper.js'
import mongoose from 'mongoose';

const createTweet = () => {
    return request(app)
    .post('/api/tweets')
    .set('Cookie', getAuthCookie())
    .send({content: 'This is a tweet'})
}
const createTweetWithId = (id) => {
    return request(app)
    .post('/api/tweets')
    .set('Cookie', getAuthCookieWithId(id))
    .send({content: 'This is a tweet'})
}
it('can fetch a list of tweets', async () => {
    await createTweet();
    await createTweet();
    await createTweet();

    const response = await request(app)
        .get('/api/tweets')
        .send()
        .expect(200)

    expect(response.body.length).toEqual(3);
})

it('can fetch a list of tweets by user id', async () => {
    const userId1 = new mongoose.Types.ObjectId().toHexString()
    const userId2 = new mongoose.Types.ObjectId().toHexString()
    const userId3 = new mongoose.Types.ObjectId().toHexString()

    await createTweetWithId(userId1)
    await createTweetWithId(userId1)
    await createTweetWithId(userId2)

    const response = await request(app)
        .post('/api/tweets/get')
        .set('Cookie', getAuthCookieWithId(userId3))
        .send({userIds: [userId2]})

    expect(response.body.length).toEqual(1);
})