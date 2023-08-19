import { Express } from 'express';
import { Client } from '../models/client';
import { BookService } from '../services/book.service';
import { BookController } from '../controllers/book.controller';

export async function BookRoutes(
	baseRoute: string,
	app: Express,
	client: Client
) {
	const service = new BookService(client);
	const books = new BookController(service);
	app.get(`${baseRoute}/`, books.getAllBooks);
	return app;
}
