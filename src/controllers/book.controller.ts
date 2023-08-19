import { Book } from '@prisma/client';
import { BookService } from '../services/book.service';
import { Request, Response } from 'express';

export class BookController {
	private service: BookService;

	constructor(service: BookService) {
		this.service = service;
	}

	async getAllBooks(_req: Request, res: Response) {
		try {
			const books: Book[] = await this.service.getAll();
			res.status(200);
			res.json({ books });
		} catch (err) {
			res.status(404);
			res.json({ error: err.message });
		}
	}
}
