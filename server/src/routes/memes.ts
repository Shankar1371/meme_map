import { FastifyInstance } from 'fastify';
import { verifyRequest } from '../auth';
import { encode } from '../geocode';
import { nsfwCheck } from '../moderation';
import { putObject } from '../storage';

export default async function (app: FastifyInstance) {
  app.get('/memes', async (req) => {
    const { bbox, mode = 'new' } = req.query as any;
    // TODO: query database
    return { items: [], bbox, mode };
  });

  app.get('/memes/:id', async (req) => {
    const { id } = req.params as any;
    // TODO: fetch from DB
    return { id };
  });

  app.post('/memes', async (req, reply) => {
    const user = await verifyRequest(req);
    if (!user) return reply.status(401).send({ error: 'unauthorized' });

    const data = await req.file();
    if (!data) return reply.status(400).send({ error: 'image required' });
    const buffer = await data.toBuffer();
    await nsfwCheck(buffer);
    const url = await putObject(buffer, 'webp');
    // TODO: insert DB row with geohash
    return { url };
  });
}
