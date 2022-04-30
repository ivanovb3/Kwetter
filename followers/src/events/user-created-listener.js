import { Listener } from '@rikwetter/common';
import { UserFollowers } from '../models/user-following.js'

export class UserCreatedListener extends Listener{
    async onMessage(data, msg) {
        const { id } = data

        const user = new UserFollowers({_id: id});

        await user.save();

        //console.log(`content of id: ${id} replicated to comments with id: ${content.id}`);

        msg.ack()
    }
}
