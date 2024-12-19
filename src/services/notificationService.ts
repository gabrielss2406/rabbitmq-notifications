import { Channel, Connection } from "amqplib";
import { connectToRabbitMQ } from "../utils/rabbitmq";

export class NotificationService {
    async sendNotification(notification: { userId: string; message: string }) {
        let connection: Connection | null = null;
        let channel: Channel | null = null;

        try {
            connection = await connectToRabbitMQ();
            channel = await connection.createChannel();

            const queue = 'notifications';
            await channel.assertQueue(queue, { durable: true });

            const message = Buffer.from(JSON.stringify(notification));
            channel.sendToQueue(queue, message);
        } catch (error) {
            throw new Error('Failed to send notification');
        } finally {
            if (channel) await channel.close();
            if (connection) await connection.close();
        }
    }
}