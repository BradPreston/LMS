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
	getOne(id: string): Promise<Book> {
		throw new Error('Method not implemented.');
	}
}
