import { Listener } from '@rikwetter/common';
import { UserProfile } from '../models/user-profile.js'

export class UserDeletedListener extends Listener{
    async onMessage(data, msg) {
        const { id } = data

        await UserProfile.deleteOne({_id: id})

        console.log(`User of id: ${id} should be deleted`);

        msg.ack()
    }
}
