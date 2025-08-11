import { FastifyInstance } from 'fastify';
import sharp from 'sharp';

export default async function (app: FastifyInstance) {
  app.get('/og/meme/:id', async (req, reply) => {
    const { id } = req.params as any;
    // TODO: render meme image with area label
    const img = await sharp({ create: { width: 300, height: 200, channels: 3, background: 'white' } })
      .png()
      .toBuffer();
    reply.header('Content-Type', 'image/png');
    return reply.send(img);
  });
}
