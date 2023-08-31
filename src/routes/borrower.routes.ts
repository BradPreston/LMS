import { Express } from 'express';
import { Client } from '../models/client';
import { BorrowerService } from '../services/borrower.service';
import { borrowerController } from '../controllers/borrower.controller';

export async function BorrowerRoutes(
	baseRoute: string,
	app: Express,
	client: Client
) {
	const service = new BorrowerService(client);
	const borrowers = borrowerController(service);
	app.get(`${baseRoute}/`, borrowers.getAllBorrowers);
	return app;
}
