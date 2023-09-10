// const PrismaClient = require("@prisma/client");
// const prisma = new PrismaClient();
//
// const books = require('./data/books');
// const borrowers = require('./data/borrowers');

import { PrismaClient } from "@prisma/client";
import books from './data/books.js';
import loans from './data/loans.js';
import borrowers from './data/borrowers.js';
const prisma = new PrismaClient();

// const loans = require('./data/loans');

async function runSeeders() {
	// Books
	await Promise.all(
		books.map(async (book) =>
			prisma.book.upsert({
				where: { id: book.id },

				update: {},

				create: book
			})
		)
	);

	// Borrowers
	await Promise.all(
		borrowers.map(async (borrower) =>
			prisma.borrower.upsert({
				where: { id: borrower.id },

				update: {},

				create: borrower
			})
		)
	);

	// Loans
	await Promise.all(
		loans.map(async (loan) =>
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
