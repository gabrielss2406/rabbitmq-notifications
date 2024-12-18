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
                    message: { type: 'string', description: 'Mensagem da notificação' },
                },
                required: ['message'],
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