import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookieWithId } from '../../test/auth-helper.js';
import { UserOrganizations } from '../../models/user-organizations.js';

it('return correct role of current user', async () => {
    const userMod = new UserOrganizations();
    userMod.role = 'MODERATOR';
    await userMod.save();

    const response = await request(app)
        .get('/api/organizations')
        .set('Cookie', getAuthCookieWithId(userMod.id))
        .expect(200);
    expect(response.body.role).toEqual('MODERATOR');
});

it('returns all other users and their roles', async () => {
    const user = new UserOrganizations();
    await user.save();

    const user2 = new UserOrganizations();
    await user2.save();

    const userAdmin = new UserOrganizations();
    await userAdmin.save();

    const response = await request(app)
        .get('/api/organizations/get')
        .set('Cookie', getAuthCookieWithId(userAdmin.id))
        .expect(200);

    expect(response.body.length).toEqual(2)
});