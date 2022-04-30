import { Listener } from '@rikwetter/common';
import { Content } from '../models/content.js'

export class ContentCreatedListener extends Listener{
    async onMessage(data, msg) {
        const { id } = data

        const content = new Content({_id: id});

        await content.save();

        //console.log(`content of id: ${id} replicated to comments with id: ${content.id}`);

        msg.ack()
    }
}
