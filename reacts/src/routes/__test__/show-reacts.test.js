import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie } from '../../test/auth-helper.js';
import { Tweet } from '../../models/tweet.js';
import mongoose from 'mongoose'

it('shows all reacts of a tweet', async () => {
    //Create 2 tweets 
    const tweet1 = new Tweet();
    await tweet1.save();

    const tweet2 = new Tweet();
    await tweet2.save();

    expect(tweet1.id).not.toEqual(tweet2.id)
    //react to tweet2
    await request(app)
        .post('/api/reacts')
        .set('Cookie', getAuthCookie())
        .send({
            tweetId: tweet1.id
        })
        .expect(201);
    
    //Check if tweet2 has a comment - it should have 0
    const tweet2Reacts = await request(app)
        .get(`/api/reacts/${tweet2.id}`)
        .set('Cookie', getAuthCookie())
        .expect(200);
    
    expect(tweet2Reacts.body.length).toEqual(0);
    
    //Check if tweet1 has a comment - it should have 1
    const tweet1Reacts = await request(app)
        .get(`/api/reacts/${tweet1.id}`)
        .set('Cookie', getAuthCookie())
        .expect(200);

    expect(tweet1Reacts.body.length).toEqual(1);

})