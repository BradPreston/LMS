import { Express } from 'express';
import { Client } from '../models/client.js';
import { BookRoutes } from './book.routes.js';
import { BorrowerRoutes } from './borrower.routes.js';

export function router(app: Express, client: Client): Express {
	BookRoutes('/books', app, client);
	BorrowerRoutes('/borrowers', app, client);
	return app;
}
