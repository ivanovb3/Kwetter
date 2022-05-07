import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie } from '../../test/auth-helper.js';
import { Tweet } from '../../models/tweet.js'
import { Comment } from '../../models/comment.js';

it('shows all comments of a tweet', async () => {
    //Create 2 tweets 
    const tweet1 = new Tweet();
    await tweet1.save();

    const tweet2 = new Tweet();
    await tweet2.save();

    expect(tweet1.id).not.toEqual(tweet2.id)
    //Write comment to tweet2
    await request(app)
        .post('/api/comments')
        .set('Cookie', getAuthCookie())
        .send({
            content: 'This is a comment',
            tweetId: tweet2.id
        })
        .expect(201);
    
    //Check if tweet2 has a comment - it should have 1
    const tweet2Comments = await request(app)
        .get(`/api/comments/${tweet2.id}`)
        .set('Cookie', getAuthCookie())
        .expect(200);
    
    expect(tweet2Comments.body.length).toEqual(1);
    
    //Check if tweet1 has a comment - it should have 0
    const tweet1Comments = await request(app)
        .get(`/api/comments/${tweet1.id}`)
        .set('Cookie', getAuthCookie())
        .expect(200);

    expect(tweet1Comments.body.length).toEqual(0);

})

it('shows all comments of an array of tweets', async () => {
    //Create 2 tweets 
    const tweet1 = new Tweet();
    await tweet1.save();

    const tweet2 = new Tweet();
    await tweet2.save();

    expect(tweet1.id).not.toEqual(tweet2.id)
    //Write comment to tweet2
    await request(app)
        .post('/api/comments')
        .set('Cookie', getAuthCookie())
        .send({
            content: 'This is a comment',
            tweetId: tweet2.id
        })
        .expect(201);

    await request(app)
        .post('/api/comments')
        .set('Cookie', getAuthCookie())
        .send({
            content: 'This is another comment',
            tweetId: tweet2.id
        })
        .expect(201);

    await request(app)
        .post('/api/comments')
        .set('Cookie', getAuthCookie())
        .send({
            content: 'This is yet another comment',
            tweetId: tweet1.id
        })
        .expect(201);
    
    //Check if tweet2 has a comment - it should have 1
    const tweetComments = await request(app)
        .post(`/api/comments/get`)
        .set('Cookie', getAuthCookie())
        .send({
            tweetIds: [tweet1.id, tweet2.id]
        })
        .expect(200);

    expect(tweetComments.body.length).toEqual(2);

})