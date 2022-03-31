import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie } from '../../test/auth-helper.js'

const createTweet = () => {
    return request(app)
    .post('/api/tweets')
    .set('Cookie', getAuthCookie())
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