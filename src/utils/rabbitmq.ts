import amqp from 'amqplib';

const RABBITMQ_URL = 'amqp://localhost'; // Ou outra URL de RabbitMQ

export const connectToRabbitMQ = async () => {
    const connection = await amqp.connect(RABBITMQ_URL);
    return connection;
};