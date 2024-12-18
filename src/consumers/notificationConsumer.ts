import { connectToRabbitMQ } from "../utils/rabbitmq";
import { Channel, Connection } from "amqplib";

export class NotificationConsumer {
    async consumeNotifications() {
        let connection: Connection;
        let channel: Channel;

        try {
            connection = await connectToRabbitMQ();
            channel = await connection.createChannel();

            const queue = 'notifications';
            await channel.assertQueue(queue, { durable: true });

            console.log(`Waiting for messages in ${queue}. To exit press CTRL+C`);

            channel.consume(queue, (msg) => {
                if (msg !== null) {
                    const messageContent = msg.content.toString();
                    console.log(`Received message: ${messageContent}`);
                    channel.ack(msg);
                }
            });
        } catch (error) {
            console.error('Error while consuming messages:', error);
        }
    }
}

const consumer = new NotificationConsumer();
consumer.consumeNotifications();