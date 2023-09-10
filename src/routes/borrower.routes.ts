import { Express } from 'express';
import { Client } from '../models/client.js';
import { BorrowerService } from '../services/borrower.service.js';
import { borrowerController } from '../controllers/borrower.controller.js';

export async function BorrowerRoutes(
	baseRoute: string,
	app: Express,
	client: Client
) {
	const service = new BorrowerService(client);
	const borrowers = borrowerController(service);
	app.get(`${baseRoute}/`, borrowers.getAllBorrowers);
	app.get(`${baseRoute}/:id`, borrowers.getOneBorrower);
	app.post(`${baseRoute}/`, borrowers.insertOneBorrower);
	app.put(`${baseRoute}/:id`, borrowers.updateBorrower);
	app.delete(`${baseRoute}/:id`, borrowers.deleteBorrower);
	return app;
}
