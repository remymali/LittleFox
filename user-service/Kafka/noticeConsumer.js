import { Kafka } from 'kafkajs';
import { saveMessage } from '../controller/studentController.js';
import  admin from 'firebase-admin';    
import serviceAccount from '../utils/serviceAccountKey.json' assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),   
  });

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
                    const { sender, title, details, date } = messageData    ;
                    //console.log("message",message)        
                    const pushMessage={
                        data:{
                          title:title,
                          body:details
                        },
                        token: 'embwT1rCCplUIWRvxrinvp:APA91bGdkDB0zZKTqSJ0Z-ZjAOds9-ZrTtnVtkXx3E6c8CXf1GvFRUftZgKrbXWNPMFoX_nIqbtXfU8IcPHjb2DSHXixsv5MiWNkF3x4fpblrNcLQ6MZPQ3tDV1M0qWUdqVqBKGJ61fD'//'DEVICE_REGISTRATION_TOKEN',
                      };
                      const pushResponse = await admin.messaging().send(pushMessage);
                      console.log('Successfully sent push notification:', pushResponse);
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
