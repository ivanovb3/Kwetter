import request from 'supertest'
import { app } from '../../app.js'

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

it('can be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/tweets')
        .send({})
    
    expect(response.status).not.toEqual(401);
});

it('returns an error if empty tweet is provided', async () => {
    
});

it('creates a new ticket', async () => {
    
});