import type { FastifyInstance, FastifyPluginCallback } from "fastify";
import { NotificationController } from "../controllers/notificationController";

const notificationRouter: FastifyPluginCallback = (app: FastifyInstance, options, done) => {
    const notificationController = new NotificationController();

    app.post("/", {
        schema: {
            description: 'Envio de notificação para os usuários',
            tags: ['Notification'],
            body: {
                type: 'object',
                properties: {
                    notification: {
                        type: 'object',
                        properties: {
                            userId: { type: 'string' },
                            message: { type: 'string' },
                        },
                    },
                },
                required: ['notification'],
            },
            response: {
                201: {
                    description: 'Mensagem enviada',
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                    },
                },
                500: {
                    type: 'object',
                    properties: {
                        error: { type: 'string' },
                    },
                },
            },
        },
        handler: notificationController.create,
    });

    done();
}

export default notificationRouter;