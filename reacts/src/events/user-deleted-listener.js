import { Listener } from '@rikwetter/common';
import { Content } from '../models/content.js'

export class UserDeletedListener extends Listener {
    async onMessage(data, msg) {
        const { id } = data

        await Content.updateMany({}, {
            $pullAll: {
                reacts: [id]
            }
        })

        console.log(`Reacts of user id: ${id} should be deleted`);

        msg.ack()
    }
}
