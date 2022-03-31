import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie } from '../../test/auth-helper.js';
import mongoose from 'mongoose'

it('returns a 404 if the ticket is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/tweets/${id}`)
        .send()
        .expect(404);
})

it('returns the ticket if the ticket is found', async() => {
    const content = 'This is a tweet'

    const response = await request(app)
        .post('/api/tweets')
        .set('Cookie', getAuthCookie())
        .send({content})
        .expect(201)

    const ticketResponse = await request(app)
        .get(`/api/tweets/${response.body.id}`)
        .send()
        .expect(200);
        
    expect(ticketResponse.body.content).toEqual(content);
})