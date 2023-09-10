import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import { BookService } from '../services/book.service.js';

export function bookController(service: BookService) {
	const getAllBooks = async (_req: Request, res: Response) => {
		try {
			const books: Book[] = await service.getAll();
			res.status(200);
			res.json(books);
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
			res.json(book);
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

	const insertOneBook = async (req: Request, res: Response) => {
		try {
			const book: Book = await service.insertOne(req.body);
			res.status(201);
			res.json(book);
		} catch (err) {
			res.status(400);
			res.json({ error: err.message });
		}
	};

	const updateBook = async (req: Request, res: Response) => {
		try {
			const book: Book = await service.updateOne(req.params.id, req.body);
			res.status(200);
			res.json(book);
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
			res.status(500);
			res.json({ error: 'Something went wrong.' });
		}
	};

	const deleteBook = async (req: Request, res: Response) => {
		try {
			await service.deleteOne(req.params.id);
			res.status(204);
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
			res.status(500);
			res.json({ error: 'Something went wrong.' });
		}
	};

	return {
		getAllBooks,
		getOneBook,
		insertOneBook,
		updateBook,
		deleteBook
	};
}
