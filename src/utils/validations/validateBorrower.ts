import { Borrower } from '@prisma/client';

type Validation = {
	valid: boolean;
	errors: string[];
};

export function validateBorrower(borrower: Borrower): Validation {
	const errors: string[] = [];
	if (borrower.name && typeof borrower.name !== 'string') {
		errors.push('name must be a string.');
	}
	if (borrower.address && typeof borrower.address !== 'string') {
		errors.push('address must be a string.');
	}
	if (borrower.phone_number && typeof borrower.phone_number !== 'string') {
		errors.push('phone_number must be a string.');
	}
	if (borrower.email && typeof borrower.email !== 'string') {
		errors.push('email must be a string.');
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
