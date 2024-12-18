import type { FastifyInstance, FastifyPluginCallback } from "fastify";
import { NotificationController } from "../controllers/notificationController";

const notificationRouter: FastifyPluginCallback = (app: FastifyInstance, options, done) => {
    const notificationController = new NotificationController();

    app.post("/", {
        handler: notificationController.create,
    });

    done();
}

export default notificationRouter;