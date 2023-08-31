import { Borrower } from '@prisma/client';
import { ILibrary } from '../models/library.interface';
import { Client } from '../models/client';

export class BorrowerService implements ILibrary<Borrower> {
	private client: Client;

	constructor(client: Client) {
		this.client = client;
	}

	getAll(): Promise<Borrower[]> {
		throw new Error('Method not implemented.');
	}
	getOne(id: string): Promise<Borrower> {
		throw new Error('Method not implemented.');
	}
	insertOne(data: Borrower): Promise<Borrower> {
		throw new Error('Method not implemented.');
	}
	updateOne(id: string, data: Borrower): Promise<Borrower> {
		throw new Error('Method not implemented.');
	}
	deleteOne(id: string): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
