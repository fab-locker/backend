const mqtt = require('mqtt')

const options = {
    host: '9badbe94c25a4774be743345e8145009.s2.eu.hivemq.cloud',
    port: 8883,
    protocol: 'mqtts',
    username: 'admin',
    password: 'Adminjunia59'
}

// initialize the MQTT client
const client = mqtt.connect(options);

// setup the callbacks
client.on('connect', function () {
    console.log('Connected');
});

client.on('error', function (error) {
    console.log(error);
});

client.on('message', function (topic, message) {
    // called each time a message is received
    console.log('Received message:', topic, message.toString());
});

// subscribe to topic 'my/test/topic'
client.subscribe('my/test/topic');

// publish message 'Hello' to topic 'my/test/topic'
client.publish('my/test/topic', 'Hello');