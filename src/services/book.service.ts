import type { Book } from '@prisma/client';
import { ILibrary } from '../models/library.interface';
import { Client } from '../models/client';

export class BookService implements ILibrary<Book> {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async getAll(): Promise<Book[]> {
		const books: Book[] = await this.client.book.findMany();

		if (books.length === 0) {
			throw new ReferenceError('No books were found.');
		}

		return books;
	}
	async getOne(id: string): Promise<Book> {
		const numID: number = parseInt(id, 10);

		if (Number.isNaN(numID)) {
			throw new TypeError('Id must be a number.');
		}

		const book: Book = await this.client.book.findFirst({
			where: { id: numID }
		});

		if (!book) {
			throw new ReferenceError(`No book with id "${numID}" was found.`);
		}

		return book;
	}
	async insertOne(data: Book): Promise<Book> {
		const book: Book = await this.client.book.create({ data });
		return book;
	}
}
