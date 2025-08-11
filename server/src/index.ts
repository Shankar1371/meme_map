import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import multipart from '@fastify/multipart';
import { config } from './env';
import { registerRoutes } from './routes';
import { setupSockets } from './sockets';

const app = Fastify({ logger: true });

app.register(websocket);
app.register(multipart);

registerRoutes(app);
setupSockets(app);

app.listen({ port: config.PORT }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening on ${address}`);
});
