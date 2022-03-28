import request from 'supertest';
import { app } from '../../app.js'

it('fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(400);
});

it('fails when an incorrect password is given', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(201);
    
    await request(app)  
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '12345'
        })
        .expect(400);
})

it('responds with a cookie on valid signin credentials', async() => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(201);
    
    const response = await request(app)  
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(200);

    expect(response.get("Set-Cookie")).toBeDefined();
})