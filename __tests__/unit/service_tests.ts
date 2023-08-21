import { Book } from '@prisma/client';
import { prismaMock } from './config/singleton';
import { BookService } from '../../src/services/book.service';

describe('Book Service', () => {
	const service = new BookService(prismaMock);

	it("shouldn't find any books", async () => {
		const books: Book[] = [];
		prismaMock.book.findMany.mockResolvedValue(books);

		await expect(service.getAll()).rejects.toThrow(
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
		prismaMock.book.findFirstOrThrow.mockResolvedValue(book);

		await expect(service.getOne('1')).resolves.toEqual({
			id: 1,
			title: 'Test Title',
			author: 'Test Author',
			publisher: 'Test Publisher',
			isbn: '0123456789',
			publication_year: 2023,
			number_of_pages: 350,
			available_copies: 2
		});
	});

	it('should error if no book is found', async () => {
		prismaMock.book.findFirstOrThrow.mockImplementation();

		await expect(service.getOne('1')).rejects.toEqual(
			new ReferenceError('No book with id "1" was found.')
		);
	});
});
