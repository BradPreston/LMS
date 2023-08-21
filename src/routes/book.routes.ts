import { Express } from 'express';
import { Client } from '../models/client';
import { BookService } from '../services/book.service';
import { bookController } from '../controllers/book.controller';

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
	return app;
}
