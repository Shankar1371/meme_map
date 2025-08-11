import { FastifyInstance } from 'fastify';
import health from './health';
import auth from './auth';
import memes from './memes';
import votes from './votes';
import comments from './comments';
import reports from './reports';
import admin from './admin';
import og from './og';

export function registerRoutes(app: FastifyInstance) {
  app.register(health);
  app.register(auth);
  app.register(memes);
  app.register(votes);
  app.register(comments);
  app.register(reports);
  app.register(admin);
  app.register(og);
}
