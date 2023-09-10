import { Express } from 'express';
import { Client } from '../models/client.js';
import { BookService } from '../services/book.service.js';
import { bookController } from '../controllers/book.controller.js';

export async function BookRoutes(
	baseRoute: string,
	app: Express,
	client: Client
) {
	const service = new BookService(client);
	const books = bookController(service);
	app.get(`${baseRoute}/`, books.getAllBooks);
	app.get(`${baseRoute}/:id`, books.getOneBook);
	app.post(`${baseRoute}/`, books.insertOneBook);
	app.put(`${baseRoute}/:id`, books.updateBook);
	app.delete(`${baseRoute}/:id`, books.deleteBook);
	return app;
}
