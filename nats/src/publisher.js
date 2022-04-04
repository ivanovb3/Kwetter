import nats from 'node-nats-streaming'
import { TweetCreatedPublisher } from './events/tweet-created-publisher.js';

const stan = nats.connect('kwetter', 'abc', {
    url: 'http://localhost:4222'
});



stan.on('connect', async () => {
    console.log('Publisher connected to NATS');

    const publisher = new TweetCreatedPublisher(stan, 'tweet:created')

    try {
        await publisher.publish({
            content: 'tweet',
            userId: 3
        })
    }
    catch (err) {
        console.log(err);
    }
})