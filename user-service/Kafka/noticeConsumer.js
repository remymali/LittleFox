import { Kafka } from 'kafkajs';
import { saveMessage } from '../controller/studentController.js';

const kafka = new Kafka({
    clientId: 'user-service',
    brokers: ['localhost:29092'],
});

const consumer = kafka.consumer({ groupId: 'user-group' });

const run = async () => {
    try {
        // Connect to Kafka broker
        await consumer.connect();
        console.log('Connected to Kafka broker');

        // Subscribe to the 'notice-messages' topic
        await consumer.subscribe({ topic: 'notice-messages' });
        console.log('Subscribed to topic: notice-messages');

        // Run the consumer
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                try {                   
                    
                    // Parse the message value as JSON
                    const messageData = JSON.parse(message.value.toString());

                    if (topic === 'notice-messages') {
                        // Process the message using the saveNoticeAndSendMessage function
                        await saveMessage(messageData);
                        console.log('Message saved and sent successfully');
                    }
                } catch (error) {
                    console.error('Error processing message:', error);
                }
            },
        });
    } catch (error) {
        console.error('Error connecting to Kafka:', error);
    }
};

run().catch(console.error);

export {run}
