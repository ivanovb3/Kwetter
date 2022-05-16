import request from 'supertest';
import { app } from '../../app.js'
import { Encrypt } from '../../services/encrypt.js';
import { getAuthCookie } from '../../test/auth-helper.js';

it('responds with details about the current user', async () => {

    const cookie = await getAuthCookie();

    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.currentUser).not.toEqual(null)
});

it('responds with null if not authenticated', async () => {

    const response = await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200);

    expect(response.body.currentUser).toEqual(null);
});