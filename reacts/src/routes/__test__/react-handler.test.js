import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie } from '../../test/auth-helper.js';
import { Content } from '../../models/content.js';
import { natsWrapper } from '../../nats-wrapper.js'
import mongoose from 'mongoose'

it('has a route handler listening to /api/comments for post requests', async () => {
    const response = await request(app)
        .post('/api/reacts')
        .send({})

    expect(response.status).not.toEqual(404);
});

it('can only be accessed if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/reacts')
        .send({})
        .expect(401)
});

it('can be accessed if the user is signed in', (done) => {
    const response = request(app)
        .post('/api/reacts')
        .set('Cookie', getAuthCookie())
        .send({})
        .end(done)

    expect(response.status).not.toEqual(401);
});

it('returns an error if no content is specified', async () => {
    const response = await request(app)
        .post('/api/reacts')
        .set('Cookie', getAuthCookie())
        .send({
            contentId: ''
        })
        .expect(400);

    expect(response.body.errors[0].message).toEqual('Content id must be provided')
});

it('returns an error if the content does not exist', async () => {
    const contentId = mongoose.Types.ObjectId();

    await request(app)
        .post('/api/reacts')
        .set('Cookie', getAuthCookie())
        .send({
            contentId: contentId
        })
        .expect(404);
})

it('test adding a heart react to a content', async () => {
    const content = new Content();
    await content.save()
    expect(content.reacts.length).toEqual(0);

    const response = await request(app)
        .post('/api/reacts')
        .set('Cookie', getAuthCookie())
        .send({
            contentId: content.id
        })
        .expect(201);

    expect(response.body.reacts.length).toEqual(1);

});

it('test removing a heart react from a content', async () => {
    const content = new Content();
    await content.save()
    expect(content.reacts.length).toEqual(0);

    const user = getAuthCookie();

    const response = await request(app)
        .post('/api/reacts')
        .set('Cookie', user)
        .send({
            contentId: content.id
        })
        .expect(201);

    expect(response.body.reacts.length).toEqual(1);

    const response2 = await request(app)
        .post('/api/reacts')
        .set('Cookie', user)
        .send({
            contentId: content.id
        })
        .expect(201);

    expect(response2.body.reacts.length).toEqual(0);

});

// it('publishes an event', async () => {
//     const content = new content()
//     await content.save()

//     await request(app)
//         .post('/api/comments')
//         .set('Cookie', getAuthCookie())
//         .send({
//             content: 'This is a comment',
//             contentId: content.id
//         })
//         .expect(201);

//     expect(natsWrapper.client.publish).toHaveBeenCalled();
// })