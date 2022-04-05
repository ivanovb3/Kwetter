export class Publisher {

    constructor(client, subject) {
        this.client = client;
        this.subject = subject
    }

    publish(data) {
        return new Promise((resolve, reject) => {
            this.client.publish(this.subject, JSON.stringify(data), (err) => {
                if (err) {
                    return reject(err);
                }
                console.log('Event published to ', this.subject)
                resolve();
            })
        })
    };

}