import { FastifyInstance } from 'fastify';

export function setupSockets(app: FastifyInstance) {
  app.get('/ws', { websocket: true }, (connection) => {
    connection.socket.send(JSON.stringify({ type: 'welcome' }));
  });
}

enum EventType {
  MemeCreated = 'meme_created',
  VoteUpdated = 'vote_updated',
  CommentCreated = 'comment_created'
}

export function emit(app: FastifyInstance, type: EventType, payload: any) {
  const server = app.websocketServer;
  server.clients.forEach((client) => {
    if (client.readyState === 1) {
      client.send(JSON.stringify({ type, payload }));
    }
  });
}

export { EventType };
