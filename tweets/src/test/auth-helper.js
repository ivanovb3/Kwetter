import request from 'supertest';
import { app } from "../app.js";
import jwt from 'jsonwebtoken'

export const getAuthCookie = async () => {

    const payload = {
        id: '123zgsfgg',
        email: 'test@test.com'
    }

    const token = jwt.sign(payload, process.env.JWT_KEY);

    const session = { jwt: token }
    const sessionJSON = JSON.stringify(session);

    const base64 = Buffer.from(sessionJSON).toString('base64');
    console.log(`exppress:sess=${base64}`)

    return [`exppress:sess=${base64}`];
}