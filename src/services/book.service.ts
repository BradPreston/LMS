import { Book } from '@prisma/client';
import { ILibrary } from '../models/library.interface.js';
import { Client } from '../models/client.js';
import { validateBook } from '../utils/validations/validateBook.js';

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

		const book: Book | null = await this.client.book.findFirst({
			where: { id: numID }
		});

		if (!book) {
			throw new ReferenceError(`No book with id "${numID}" was found.`);
		}

		return book;
	}
	async insertOne(data: Book): Promise<Book> {
		const isValidBook = validateBook(data);

		if (!isValidBook.valid) {
			throw new TypeError(isValidBook.errors[0]);
		}

		const book: Book = await this.client.book.create({ data });
		return book;
	}
	async updateOne(id: string, book: Book): Promise<Book> {
		const numID: number = parseInt(id, 10);

		if (Number.isNaN(numID)) {
			throw new TypeError('Id must be a number.');
		}

		const foundBook: Book | null = await this.client.book.findFirst({
			where: { id: numID }
		});

		if (!foundBook) {
			throw new ReferenceError(`No book with id "${numID}" was found.`);
		}

		const isValidBook = validateBook(book);

		if (!isValidBook.valid) {
			throw new TypeError(isValidBook.errors[0]);
		}

		const updatedBook: Book = await this.client.book.update({
			where: { id: numID },
			data: book
		});

		return updatedBook;
	}
	// TODO: only delete book if there is no loan out on that book
	async deleteOne(id: string): Promise<void> {
		const numID: number = parseInt(id, 10);

		if (Number.isNaN(numID)) {
			throw new TypeError('Id must be a number.');
		}

		const foundBook: Book | null = await this.client.book.findFirst({
			where: { id: numID }
		});

		if (!foundBook) {
			throw new ReferenceError(`No book with id "${numID}" was found.`);
		}

		await this.client.book.delete({
			where: { id: numID }
		});
	}
}
