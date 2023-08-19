import { Express } from 'express';
import { Client } from '../models/client';
import { BookRoutes } from './book.routes';

export function router(app: Express, client: Client): Express {
	BookRoutes('/books', app, client);
	return app;
}
