import { connectToRabbitMQ } from "../utils/rabbitmq";

export class NotificationService {
    async sendNotification(message: string) {
        let connection;
        let channel;

        try {
            connection = await connectToRabbitMQ();
            channel = await connection.createChannel();

            const queue = 'notifications';
            await channel.assertQueue(queue, { durable: true });

            channel.sendToQueue(queue, Buffer.from(message));
            console.log(`Message sent to queue: ${message}`);
        } catch (error) {
            console.error('Error sending message to queue:', error);
            throw new Error('Failed to send notification');
        } finally {
            if (channel) {
                await channel.close();
            }
            if (connection) {
                await connection.close();
            }
        }
    }
}