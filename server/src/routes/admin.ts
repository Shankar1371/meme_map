import { FastifyInstance } from 'fastify';
import { verifyRequest } from '../auth';

export default async function (app: FastifyInstance) {
  app.get('/admin/mod-queue', async (req, reply) => {
    const user = await verifyRequest(req);
    if (!user) return reply.status(401).send({ error: 'unauthorized' });
    // TODO: check admin role
    return { items: [] };
  });

  app.post('/admin/decision', async (req, reply) => {
    const user = await verifyRequest(req);
    if (!user) return reply.status(401).send({ error: 'unauthorized' });
    const { meme_id, action } = req.body as any;
    // TODO: update meme status
    return { meme_id, action };
  });
}
