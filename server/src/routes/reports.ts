import { FastifyInstance } from 'fastify';
import { verifyRequest } from '../auth';

export default async function (app: FastifyInstance) {
  app.post('/memes/:id/report', async (req, reply) => {
    const user = await verifyRequest(req);
    if (!user) return reply.status(401).send({ error: 'unauthorized' });
    const { id } = req.params as any;
    const { reason } = req.body as any;
    // TODO: insert report and auto-quarantine if >=3
    return { id, reason };
  });
}
