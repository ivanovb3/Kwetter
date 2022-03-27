import request from 'supertest';
import { app } from '../../app.js'

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(201);
});

it('returns a 400 with an invalid email', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test',
            password: '1234'
        })
        .expect(400);
    expect(response.body.errors[0].message).toEqual('Email must be valid')
});

it('returns a 400 with an invalid password', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123'
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Password must be between 4 and 20 characters')
});

it('returns a 400 with missing email and password', async () => {
    const firstResponse = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    expect(firstResponse.body.errors[0].message).toEqual('Password must be between 4 and 20 characters')
    
    const secondResponse = await request(app)
        .post('/api/users/signup')
        .send({
            password: "1234"
        })
        .expect(400);

    expect(secondResponse.body.errors[0].message).toEqual('Email must be valid')
});

it('checks for duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(201);
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Email already in use')
});

it('sets cookie on signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '1234'
        })
        .expect(201);
    
    expect(response.get("Set-Cookie")).toBeDefined();

});