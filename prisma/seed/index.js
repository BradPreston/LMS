import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

import { map } from './data/books';

import { map as _map } from './data/borrowers';

import { map as __map } from './data/loans';

async function runSeeders() {
	// Books
	await Promise.all(
		map(async (book) =>
			prisma.book.upsert({
				where: { id: book.id },

				update: {},

				create: book
			})
		)
	);

	// Borrowers
	await Promise.all(
		_map(async (borrower) =>
			prisma.borrower.upsert({
				where: { id: borrower.id },

				update: {},

				create: borrower
			})
		)
	);

	// Loans
	await Promise.all(
		__map(async (loan) =>
			prisma.loan.upsert({
				where: { id: loan.id },

				update: {},

				create: loan
			})
		)
	);
}

runSeeders()
	.catch((e) => {
		console.error(`There was an error while seeding: ${e}`);

		process.exit(1);
	})

	.finally(async () => {
		console.log('Successfully seeded database. Closing connection.');

		await prisma.$disconnect();
	});
