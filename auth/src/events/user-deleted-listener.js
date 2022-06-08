import { Listener } from '@rikwetter/common';
import { User } from '../models/user.js';

export class UserDeletedListener extends Listener{
    async onMessage(data, msg) {
        const { id } = data

        await User.deleteOne({_id: id})

        console.log(`User of id: ${id} should be deleted`);

        msg.ack()
    }
}
