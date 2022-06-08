import { Listener, Publisher } from '@rikwetter/common';
import { Tweet } from '../models/tweet.js';
import { Comment } from '../models/comment.js'

export class TweetDeletedListener extends Listener {
    async onMessage(data, msg) {
        const { id } = data

        const comments = await Comment.find({ tweetId: id });

        for (var i = 0; i < comments.length; i++) {
            new Publisher(natsWrapper.client, 'comment:deleted').publish({
                id: comments[i].id
            })
        }

        await Comment.deleteMany({ tweetId: id })
        await Tweet.deleteOne({ _id: id })

        console.log(`Comments of tweet id: ${id} should be deleted`);

        msg.ack()
    }
}
