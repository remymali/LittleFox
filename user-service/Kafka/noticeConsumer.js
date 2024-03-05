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
                    try {
                        const pushMessage={
                            data:{
                              title:title,
                              body:details
                            },
                            token: 'embwT1rCCplUIWRvxrinvp:APA91bGS2qgcF8v3un8qEStVi7mbZksjc_uEe_14V9x3hnrAuhx_28wnP0Bea6CiSzJHLmVkEL7oiT88-DarILf339JDTm8PMlhZaHsJYgF_Kzg6mWXu-ar548zmEb1PnP-_bg3BtNAI'//'DEVICE_REGISTRATION_TOKEN',
                          };
                          const pushResponse = await admin.messaging().send(pushMessage);
                          console.log('Successfully sent push notification:', pushResponse);
                    } catch (error) {
                        console.log("error",error)
                    }   
                    
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
