import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie } from '../../test/auth-helper.js'
import mongoose from 'mongoose'
import { cookie } from 'express-validator'

it('returns a 404 if provided id does not exist', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()
    await request(app)
        .put(`/api/tweets/${id}`)
        .set('Cookie', getAuthCookie())
        .send({
            content: 'This is a tweet'
        })
        .expect(404);
})

it('returns a 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString()

    await request(app)
        .put(`/api/tweets/${id}`)        
        .send({
            content: 'This is an updated tweet'
        })
        .expect(401);
})

it('returns a 401 if user does not own the ticket', async () => {
    const response = await request(app)
        .post('/api/tweets')
        .set('Cookie', getAuthCookie())
        .send({content : 'This is a tweet'})
        .expect(201);

    await request(app)
        .put(`/api/tweets/${response.body.id}`)
        .set('Cookie', getAuthCookie())
        .send({content: 'Updated tweeet'})
        .expect(401);
})

it('returns a 400 if user provides ivalid content', async () => {
    const cookie = getAuthCookie()
    
    const response = await request(app)
        .post('/api/tweets')
        .set('Cookie', cookie)
        .send({content : 'This is a tweet'})
        .expect(201);

    await request(app)
        .put(`/api/tweets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({content: ''})
        .expect(400);
})

it('updates the ticket', async () => {
    const cookie = getAuthCookie()
    
    const response = await request(app)
        .post('/api/tweets')
        .set('Cookie', cookie)
        .send({content : 'This is a tweet'})
        .expect(201);

    await request(app)
        .put(`/api/tweets/${response.body.id}`)
        .set('Cookie', cookie)
        .send({content: 'Updated tweet'})
        .expect(200);

    const tweet = await request(app)
        .get(`/api/tweets/${response.body.id}`)
        .send()
        .expect(200);
    
    expect(tweet.body.content).toEqual('Updated tweet')

    
})