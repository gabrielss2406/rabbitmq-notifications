import type { FastifyReply, FastifyRequest } from "fastify";
import { NotificationService } from "../services/notificationService";

export class NotificationController {
    async create(request: FastifyRequest<{ Body: { notification: { userId: string, message: string } } }>, reply: FastifyReply) {
        const notificationService = new NotificationService();
        const { notification } = request.body

        try {
            await notificationService.sendNotification(notification);
            reply.status(201).send({ message: 'Notification sent successfully' });
        } catch (error) {
            console.error(error)
            reply.status(500).send({ error: 'Failed to send notification' });
        }
    }
}
