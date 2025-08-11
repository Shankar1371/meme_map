import { FastifyInstance } from 'fastify';
import { verifyRequest } from '../auth';
import { emit, EventType } from '../sockets';
import { computeScore } from '../ranking';

export default async function (app: FastifyInstance) {
  app.post('/memes/:id/vote', async (req, reply) => {
    const user = await verifyRequest(req);
    if (!user) return reply.status(401).send({ error: 'unauthorized' });
    const { id } = req.params as any;
    const { value } = req.body as any;
    // TODO: upsert vote and recompute score
    const score = computeScore({ upvotes: 1, downvotes: 0, commentCount: 0, createdAt: new Date() });
    emit(app, EventType.VoteUpdated, { id, score });
    return { id, score, value };
  });
}
