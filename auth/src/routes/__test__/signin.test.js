import request from 'supertest';
import { app } from '../../app.js'

it('fails when a email that does not exist is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test1@test.com',
            password: '1234'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(400);
    
    expect(response.body.errors[0].message).toEqual('User does not exist')
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
        .post('/api/users/signup')
        .send({
            email: 'test1@test.com',
            password: '12345'
        })
        .expect(201);
    
    const response = await request(app)  
        .post('/api/users/signin')
        .send({
            email: 'test1@test.com',
            password: '1234'
        })
        .expect(400);
    
    expect(response.body.errors[0].message).toEqual('Incorrect password')
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