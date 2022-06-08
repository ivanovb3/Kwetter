import { Listener } from '@rikwetter/common';
import { UserOrganizations } from '../models/user-organizations.js';

export class UserDeletedListener extends Listener{
    async onMessage(data, msg) {
        const { id } = data

        await UserOrganizations.deleteOne({_id: id});

        console.log(`User of id: ${id} should be deleted`);

        msg.ack()
    }
}
