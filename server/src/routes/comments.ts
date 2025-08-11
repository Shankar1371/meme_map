import { FastifyInstance } from 'fastify';
import { verifyRequest } from '../auth';
import { emit, EventType } from '../sockets';

export default async function (app: FastifyInstance) {
  app.get('/memes/:id/comments', async (req) => {
    const { id } = req.params as any;
    // TODO: fetch comments from DB
    return { id, comments: [] };
  });

  app.post('/memes/:id/comments', async (req, reply) => {
    const user = await verifyRequest(req);
    if (!user) return reply.status(401).send({ error: 'unauthorized' });
    const { id } = req.params as any;
    const { body } = req.body as any;
    // TODO: insert comment
    const comment = { id: 'temp', body, user_id: user.id };
    emit(app, EventType.CommentCreated, { meme_id: id, comment });
    return comment;
  });
}
