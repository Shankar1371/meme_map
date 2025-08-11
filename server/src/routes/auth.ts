import { FastifyInstance } from 'fastify';
import { devLogin, UserToken } from '../auth';

export default async function (app: FastifyInstance) {
  app.post('/auth/dev-login', async (req, reply) => {
    const body = req.body as Partial<UserToken>;
    if (!body.id || !body.handle) {
      return reply.status(400).send({ error: 'id and handle required' });
    }
    const token = devLogin({ id: body.id, handle: body.handle, email: body.email });
    return { token };
  });
}
