import request from 'supertest'
import { app } from '../../app.js'
import { getAuthCookie } from '../../test/auth-helper.js';
import { Content } from '../../models/content.js';
import mongoose from 'mongoose'

it('shows all reacts of a content', async () => {
    //Create 2 contents 
    const content1 = new Content();
    await content1.save();

    const content2 = new Content();
    await content2.save();

    expect(content1.id).not.toEqual(content2.id)
    //react to content2
    await request(app)
        .post('/api/reacts')
        .set('Cookie', getAuthCookie())
        .send({
            contentId: content1.id
        })
        .expect(201);
    
    //Check if content2 has a comment - it should have 0
    const content2Reacts = await request(app)
        .get(`/api/reacts/${content2.id}`)
        .set('Cookie', getAuthCookie())
        .expect(200);
    
    expect(content2Reacts.body.length).toEqual(0);
    
    //Check if content1 has a comment - it should have 1
    const content1Reacts = await request(app)
        .get(`/api/reacts/${content1.id}`)
        .set('Cookie', getAuthCookie())
        .expect(200);

    expect(content1Reacts.body.length).toEqual(1);

})