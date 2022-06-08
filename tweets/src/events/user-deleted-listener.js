import { Listener, Publisher } from '@rikwetter/common';
import { Tweet } from '../models/tweet.js';
import { natsWrapper } from '../nats-wrapper.js';

export class UserDeletedListener extends Listener {
    async onMessage(data, msg) {
        const { id } = data

        const tweets = await Tweet.find({ userId: id });

        for (var i = 0; i < tweets.length; i++) {
            await new Publisher(natsWrapper.client, 'tweet:deleted').publish({
                id: tweets[i].id
            })
        }

        await Tweet.deleteMany({ userId: id })

        console.log(`Tweets of user id: ${id} should be deleted`);

        msg.ack()
    }
}
