import nats from 'node-nats-streaming'

const stan = nats.connect('kwetter', 'abc', {
    url: 'http://localhost:4222'
});

stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20,
      });
    
      stan.publish('tweet:created', data, () => {
        console.log('Event published');
      });
})