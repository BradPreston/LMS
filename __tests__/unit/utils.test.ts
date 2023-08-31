import { Book } from '@prisma/client';
import { validateBook } from '../../src/utils/validations/validateBook';

describe('utils', () => {
	describe('validateBook', () => {
		it('should validate a book', () => {
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

			const validation = validateBook(book);
			expect(validation).toEqual({ errors: [], valid: true });
		});

		it('should throw one error for one invalid type', () => {
			const book: Book = {
				id: 1,
				title: 'Test Title',
				author: 'Test Author',
				publisher: 'Test Publisher',
				// @ts-ignore
				isbn: 1234567890,
				publication_year: 2023,
				number_of_pages: 350,
				available_copies: 2
			};

			const validation = validateBook(book);
			expect(validation.errors).toHaveLength(1);
			expect(validation.errors).toContain('isbn must be a string.');
			expect(validation.valid).toBe(false);
		});

		it('should throw multiple errors for multiple invalid types', () => {
			const book: Book = {
				id: 1,
				title: 'Test Title',
				author: 'Test Author',
				publisher: 'Test Publisher',
				// @ts-ignore
				isbn: 1234567890,
				// @ts-ignore
				publication_year: '2023',
				number_of_pages: 350,
				available_copies: 2
			};

			const validation = validateBook(book);
			expect(validation.errors).toHaveLength(2);
			expect(validation.errors).toContain('isbn must be a string.');
			expect(validation.errors).toContain(
				'publication_year must be a number.'
			);
			expect(validation.valid).toBe(false);
		});
	});
});
