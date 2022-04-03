import { Listener } from './base-listener.js';

export class TweetCreatedListener extends Listener {
    
    onMessage(data, msg){
        console.log('Event data', data);
        console.log(`Content is ${data.content}, user is: ${data.userId}`)

        msg.ack(); 
    }
}