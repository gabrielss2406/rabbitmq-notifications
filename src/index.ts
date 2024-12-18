import Fastify, { type FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import notificationRouter from './routers/notificationRouter';

const createServer = (): FastifyInstance => {
  const app: FastifyInstance = Fastify({ logger: true });

  app.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'RabbitMQ-Notifications',
        description: 'Simple API to use and learn RabbitMQ',
        version: '1.0.0',
      },
    },
  });
  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
  });

  app.register(notificationRouter);

  return app;
};

const start = async (app: FastifyInstance) => {
  try {
    await app.listen({ port: 8080 });
    app.log.info("Server listening on: http://localhost:8080");
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

const app = createServer();
start(app);
