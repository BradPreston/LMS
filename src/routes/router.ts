import { Express } from 'express';
import { Client } from '../models/client';
import { BookRoutes } from './book.routes';
import { BorrowerRoutes } from './borrower.routes';

export function router(app: Express, client: Client): Express {
	BookRoutes('/books', app, client);
	BorrowerRoutes('/borrowers', app, client);
	return app;
}
