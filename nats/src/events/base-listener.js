export class Listener{

    constructor(client, subject, queueGroupName){
        if(this.constructor === Listener) {
            throw new Error("FYI: Instance of Abstract class cannot be instantiated");
        }
        this.client = client;
        this.subject = subject;
        this.queueGroupName = queueGroupName;
    }

    subscriptionOptions(queueGroupName) {
        return this.client
            .subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(10000)
            .setDurableName(queueGroupName)
    }

    listen() {
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions(this.queueGroupName)
        )

        subscription.on('message', (msg) => {
            console.log(
                `Message received: ${this.subject} / ${this.queueGroupName}`
            )

            const parsedData = this.parserMessage(msg);
            this.onMessage(parsedData, msg);
        });
    }
    
    parserMessage(msg){
        const data = msg.getData();
        return typeof data === 'string'
            ? JSON.parse(data)
            : JSON.parser(data.toString('utf8'));
    }
}