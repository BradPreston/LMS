const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const Books = require('./data/books');

const Borrowers = require('./data/borrowers');

const Loans = require('./data/loans');

async function runSeeders() {
	// Books
	await Promise.all(
		Books.map(async (book) =>
			prisma.book.upsert({
				where: { id: book.id },

				update: {},

				create: book
			})
		)
	);

	// Borrowers
	await Promise.all(
		Borrowers.map(async (borrower) =>
			prisma.borrower.upsert({
				where: { id: borrower.id },

				update: {},

				create: borrower
			})
		)
	);

	// Loans
	await Promise.all(
		Loans.map(async (loan) =>
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
