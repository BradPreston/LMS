import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import { BookService } from '../services/book.service';

export function bookController(service: BookService) {
	const getAllBooks = async (_req: Request, res: Response) => {
		try {
			const books: Book[] = await service.getAll();
			res.status(200);
			res.json({ books });
		} catch (err) {
			res.status(404);
			res.json({ error: err.message });
		}
	};

	return {
		getAllBooks: getAllBooks
	};
}
