import { Listener } from '@rikwetter/common';
import { Content } from '../models/content.js';

export class ContentDeletedListener extends Listener{
    async onMessage(data, msg) {
        const { id } = data

        await Content.deleteOne({_id: id})

        console.log(`Content of id: ${id} should be deleted`);

        msg.ack()
    }
}
