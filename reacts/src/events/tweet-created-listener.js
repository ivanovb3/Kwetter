import { Listener } from '@rikwetter/common';
import { Tweet } from '../models/tweet.js'

export class TweetCreatedListener extends Listener{
    async onMessage(data, msg) {
        const { id } = data

        const tweet = new Tweet({_id: id});

        await tweet.save();

        //console.log(`Tweet of id: ${id} replicated to comments with id: ${tweet.id}`);

        msg.ack()
    }
}
