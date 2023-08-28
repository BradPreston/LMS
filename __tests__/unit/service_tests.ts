import { Book } from '@prisma/client';
import { prismaMock } from '../../config/tests/singleton';
import { BookService } from '../../src/services/book.service';

describe('Book Service', () => {
	const service = new BookService(prismaMock);

	it('should error if no books are found', async () => {
		const books: Book[] = [];
		prismaMock.book.findMany.mockResolvedValue(books);

		await expect(service.getAll()).rejects.toThrow(
			new ReferenceError('No books were found.')
		);
	});

	it("shouldn't error if books are found", async () => {
		const books: Book[] = [
			{
				id: 1,
				title: 'Test Title',
				author: 'Test Author',
				publisher: 'Test Publisher',
				isbn: '0123456789',
				publication_year: 2023,
				number_of_pages: 350,
				available_copies: 2
			}
		];

		prismaMock.book.findMany.mockResolvedValue(books);

		await expect(service.getAll()).resolves.not.toThrow(
			new ReferenceError('No books were found.')
		);
	});

	it('should have a length of 2 books', async () => {
		const books: Book[] = [
			{
				id: 1,
				title: 'Test Title',
				author: 'Test Author',
				publisher: 'Test Publisher',
				isbn: '0123456789',
				publication_year: 2023,
				number_of_pages: 350,
				available_copies: 2
			},
			{
				id: 2,
				title: 'Test Title',
				author: 'Test Author',
				publisher: 'Test Publisher',
				isbn: '0123456789',
				publication_year: 2023,
				number_of_pages: 350,
				available_copies: 2
			}
		];

		prismaMock.book.findMany.mockResolvedValue(books);

		await expect(service.getAll()).resolves.toHaveLength(2);
	});

	it('should find one book', async () => {
		const book: Book = {
			id: 1,
			title: 'Test Title',
			author: 'Test Author',
			publisher: 'Test Publisher',
			isbn: '0123456789',
			publication_year: 2023,
			number_of_pages: 350,
			available_copies: 2
		};
		prismaMock.book.findFirst.mockResolvedValue(book);

		await expect(service.getOne('1')).resolves.toEqual(book);
	});

	it('should error if no book is found', async () => {
		prismaMock.book.findFirst.mockImplementation();

		await expect(service.getOne('1')).rejects.toEqual(
			new ReferenceError('No book with id "1" was found.')
		);
	});

	it('should create a book', async () => {
		const book: Book = {
			id: 1,
			title: 'Test Title',
			author: 'Test Author',
			publisher: 'Test Publisher',
			isbn: '0123456789',
			publication_year: 2023,
			number_of_pages: 350,
			available_copies: 2
		};

		prismaMock.book.create.mockResolvedValue(book);

		await expect(service.insertOne(book)).resolves.toEqual(book);
	});

	it("shouldn't create a book with bad data", async () => {
		const book: Book = {
			title: 'Test Title',
			author: 'Test Author',
			publisher: 'Test Publisher',
			// @ts-ignore
			isbn: 1234567890,
			publication_year: 2023,
			number_of_pages: 350,
			available_copies: 2
		};

		prismaMock.book.create.mockRejectedValue(book);

		// @ts-ignore
		await expect(service.insertOne(book)).rejects.toEqual(
			new TypeError('isbn must be a string.')
		);
	});

	it('should update a book with good data', async () => {
		const book: Book = {
			id: 1,
			title: 'Test Title',
			author: 'Test Author',
			publisher: 'Test Publisher',
			isbn: '1234567890',
			publication_year: 2023,
			number_of_pages: 350,
			available_copies: 2
		};

		prismaMock.book.create.mockResolvedValue(book);

		await expect(service.updateOne('1', book)).resolves.toEqual(book);
	});
});
