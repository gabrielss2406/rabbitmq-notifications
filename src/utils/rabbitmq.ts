import amqp from 'amqplib';
import dotenv from 'dotenv'

dotenv.config();

export const connectToRabbitMQ = async () => {
    const connection = await amqp.connect(process.env.RABBITMQ_URL as string);
    return connection;
};