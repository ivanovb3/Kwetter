import { Listener } from '@rikwetter/common';
import { UserProfile } from '../models/user-profile.js'

export class UserCreatedListener extends Listener{
    async onMessage(data, msg) {
        const { id } = data

        const user = new UserProfile({_id: id});

        await user.save();

        msg.ack()
    }
}
