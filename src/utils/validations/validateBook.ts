import { Book } from '@prisma/client';

type ValidationError = {
	valid: boolean;
	errors: string[];
};

export function validateBook(book: Book): ValidationError {
	const errors: string[] = [];
	if (book.title && typeof book.title !== 'string') {
		errors.push('title must be a string.');
	}
	if (book.author && typeof book.author !== 'string') {
		errors.push('author must be a string.');
	}
	if (book.publisher && typeof book.publisher !== 'string') {
		errors.push('publisher must be a string.');
	}
	if (book.isbn && typeof book.isbn !== 'string') {
		errors.push('isbn must be a string.');
	}
	if (book.publication_year && typeof book.publication_year !== 'number') {
		errors.push('publication_year must be a number.');
	}
	if (book.number_of_pages && typeof book.number_of_pages !== 'number') {
		errors.push('number_of_pages must be a number.');
	}
	if (book.available_copies && typeof book.available_copies !== 'number') {
		errors.push('available_copies must be a number.');
	}
	if (errors.length > 0) {
		return {
			valid: false,
			errors
		};
	}
	return {
		valid: true,
		errors: []
	};
}
