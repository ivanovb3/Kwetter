import { Listener } from './base-listener.js';

export class TweetCreatedListener extends Listener {
    
    onMessage(data, msg){
        console.log('Event data', data);

        msg.ack();
    }
}