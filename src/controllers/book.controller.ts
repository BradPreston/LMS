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
			if (err instanceof ReferenceError) {
				res.status(404);
				res.json({ error: err.message });
				return;
			}
			res.status(400);
			res.json({ error: 'Something went wrong.' });
		}
	};

	const getOneBook = async (req: Request, res: Response) => {
		try {
			const book: Book = await service.getOne(req.params.id);
			res.status(200);
			res.json({ book });
		} catch (err) {
			if (err instanceof ReferenceError) {
				res.status(404);
				res.json({ error: err.message });
				return;
			}
			if (err instanceof TypeError) {
				res.status(400);
				res.json({ error: err.message });
				return;
			}
			res.status(400);
			res.json({ error: 'Something went wrong.' });
		}
	};

	return {
		getAllBooks,
		getOneBook
	};
}
