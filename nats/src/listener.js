import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TweetCreatedListener } from './events/tweet-created-listener.js';

console.clear()

const stan = nats.connect('kwetter', randomBytes(4).toString('hex'), {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    })

    new TweetCreatedListener(stan, 'tweet:created', 'tweets-service').listen();
})

process.on('SiGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());