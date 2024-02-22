import { Kafka } from 'kafkajs';

const kafka = new Kafka({
    clientId: 'notice-service',
  brokers: ['localhost:29092']
});

const producer = kafka.producer();
// producer.connect();
const initProducer = async () => {
  try {
    await producer.connect();
    console.log('Kafka producer connected');
  } catch (error) {
    console.error('Error connecting to Kafka producer:', error);
    // Handle initialization error, retry, or exit gracefully
  }
};

const sendMessage = async (message) => {
  try {
    await producer.send({
      topic: 'notice-messages',
      messages: [
        { value: JSON.stringify(message) }
      ],
    });
    console.log('Message sent successfully:', message);
  } catch (error) {
    console.error('Error sending message:', error);
    // Handle sending message error, retry, or exit gracefully
  }
};

const saveNoticeAndSendMessage = async (notice) => {
  try {
    console.log("notice",notice)
    try {
        await producer.connect();
        console.log('Kafka producer connected');
      } catch (error) {
        console.error('Error connecting to Kafka producer:', error);
        // Handle initialization error, retry, or exit gracefully
      }
    await sendMessage(notice);
  } catch (error) {
    console.error('Error saving notice and sending message:', error);
    // Handle error, retry, or exit gracefully
  }
};

export {
  saveNoticeAndSendMessage,
  initProducer
};
