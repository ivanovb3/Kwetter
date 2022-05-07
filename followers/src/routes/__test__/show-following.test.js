import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookieWithId } from '../../test/auth-helper.js';
import { UserFollowers } from "../../models/user-following.js"

it('shows all people a user follows', async () => {
    const user = new UserFollowers();
    await user.save()
    expect(user.following.length).toEqual(0);
    expect(user.followers.length).toEqual(0);

    const userToBeFollowed = new UserFollowers();
    await userToBeFollowed.save()

    expect(userToBeFollowed.following.length).toEqual(0);
    expect(userToBeFollowed.followers.length).toEqual(0);

    const response = await request(app)
        .post('/api/followers')
        .set('Cookie', getAuthCookieWithId(user.id))
        .send({
            userId: userToBeFollowed.id
        })
        .expect(201);

    expect(response.body.following.length).toEqual(1);

    const responseUsers = await request(app)
        .get('/api/followers')
        .set('Cookie', getAuthCookieWithId(user.id))
        .expect(200)

    expect(responseUsers.body[0]).toEqual(userToBeFollowed.id);
})

it('shows all people that follow a user', async () => {
    const user = new UserFollowers();
    await user.save()
    expect(user.following.length).toEqual(0);
    expect(user.followers.length).toEqual(0);

    const userToBeFollowed = new UserFollowers();
    await userToBeFollowed.save()

    expect(userToBeFollowed.following.length).toEqual(0);
    expect(userToBeFollowed.followers.length).toEqual(0);

    const response = await request(app)
        .post('/api/followers')
        .set('Cookie', getAuthCookieWithId(user.id))
        .send({
            userId: userToBeFollowed.id
        })
        .expect(201);

    expect(response.body.following.length).toEqual(1);

    const responseUsers = await request(app)
        .get('/api/followers/myfollowers')
        .set('Cookie', getAuthCookieWithId(userToBeFollowed.id))
        .expect(200)

    expect(responseUsers.body[0]).toEqual(user.id);
})

it('show recommendation for new following', async () => {
    const user = new UserFollowers();
    await user.save()
    expect(user.following.length).toEqual(0);
    expect(user.followers.length).toEqual(0);

    const userToBeFollowed = new UserFollowers();
    await userToBeFollowed.save()

    const userRecommended = new UserFollowers();
    await userRecommended.save()

    expect(userToBeFollowed.following.length).toEqual(0);
    expect(userToBeFollowed.followers.length).toEqual(0);

    await request(app)
        .post('/api/followers')
        .set('Cookie', getAuthCookieWithId(user.id))
        .send({
            userId: userToBeFollowed.id
        })
        .expect(201);

    const responseUsers = await request(app)
        .get('/api/followers/explore')
        .set('Cookie', getAuthCookieWithId(user.id))
        .expect(200)

    expect(responseUsers.body[0]).toEqual(userRecommended.id);
})