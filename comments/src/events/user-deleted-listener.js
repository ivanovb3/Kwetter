import { Listener, Publisher } from '@rikwetter/common';
import { Comment } from '../models/comment.js';
import { natsWrapper } from '../nats-wrapper.js';

export class UserDeletedListener extends Listener {
    async onMessage(data, msg) {
        const { id } = data

        const comments = await Comment.find({ userId: id });

        for (var i = 0; i < comments.length; i++) {
            await new Publisher(natsWrapper.client, 'comment:deleted').publish({
                id: comments[i].id
            })
        }

        await Comment.deleteMany({ userId: id })

        console.log(`Comments of user id: ${id} should be deleted`);

        msg.ack()
    }
}
