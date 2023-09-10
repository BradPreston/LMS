import { Borrower } from '@prisma/client';
import { ILibrary } from '../models/library.interface.js';
import { Client } from '../models/client.js';
import { validateBorrower } from '../utils/validations/validateBorrower.js';

export class BorrowerService implements ILibrary<Borrower> {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	async getAll(): Promise<Borrower[]> {
		const borrowers: Borrower[] = await this.client.borrower.findMany();

		if (borrowers.length === 0) {
			throw new ReferenceError('No borrowers were found.');
		}

		return borrowers;
	}
	async getOne(id: string): Promise<Borrower> {
		const numID: number = parseInt(id, 10);

		if (Number.isNaN(numID)) {
			throw new TypeError('Id must be a number.');
		}

		const borrower: Borrower | null = await this.client.borrower.findFirst({
			where: { id: numID }
		});

		if (!borrower) {
			throw new ReferenceError(`No borrower with id "${numID}" was found.`);
		}

		return borrower;
	}
	async insertOne(data: Borrower): Promise<Borrower> {
		const isValidBorrower = validateBorrower(data);

		if (!isValidBorrower.valid) {
			throw new TypeError(isValidBorrower.errors[0]);
		}

		const borrower: Borrower = await this.client.borrower.create({ data });
		return borrower;
	}
	async updateOne(id: string, borrower: Borrower): Promise<Borrower> {
		const numID: number = parseInt(id, 10);

		if (Number.isNaN(numID)) {
			throw new TypeError('Id must be a number.');
		}

		const foundBorrower: Borrower | null = await this.client.borrower.findFirst({
			where: { id: numID }
		});

		if (!foundBorrower) {
			throw new ReferenceError(`No borrower with id "${numID}" was found.`);
		}

		const isValidBorrower = validateBorrower(borrower);

		if (!isValidBorrower.valid) {
			throw new TypeError(isValidBorrower.errors[0]);
		}

		const updatedBorrower: Borrower = await this.client.borrower.update({
			where: { id: numID },
			data: borrower
		});

		return updatedBorrower;
	}
	async deleteOne(id: string): Promise<void> {
		const numID: number = parseInt(id, 10);

		if (Number.isNaN(numID)) {
			throw new TypeError('Id must be a number.');
		}

		const foundBorrower: Borrower | null = await this.client.borrower.findFirst({
			where: { id: numID }
		});

		if (!foundBorrower) {
			throw new ReferenceError(`No borrower with id "${numID}" was found.`);
		}

		await this.client.borrower.delete({
			where: { id: numID }
		});
	}
}
