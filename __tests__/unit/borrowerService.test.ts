import { Borrower } from '@prisma/client';
import { prismaMock } from '../../config/tests/singleton';
import { BorrowerService } from '../../src/services/borrower.service';

describe('borrower service', () => {
	const service = new BorrowerService(prismaMock);

	it('should error if no borrowers are found', async () => {
		const borrowers: Borrower[] = [];
		prismaMock.borrower.findMany.mockResolvedValue(borrowers);

		await expect(service.getAll()).rejects.toThrow(
			new ReferenceError('No borrowers were found.')
		);
	});

	it("shouldn't error if borrowers are found", async () => {
		const borrowers: Borrower[] = [
			{
				id: 1,
				name: 'Test Name',
				address: '123 Test St, Los Angeles, CA 90210',
				phone_number: '1234567890',
				email: 'user@test.com'
			}
		];

		prismaMock.borrower.findMany.mockResolvedValue(borrowers);

		await expect(service.getAll()).resolves.not.toThrow(
			new ReferenceError('No borrowers were found.')
		);
	});

	it('should have a length of 2 borrowers', async () => {
		const borrowers: Borrower[] = [
			{
				id: 1,
				name: 'Test Name',
				address: '123 Test St, Los Angeles, CA 90210',
				phone_number: '1234567890',
				email: 'user@test.com'
			},
			{
				id: 2,
				name: 'Mike Test',
				address: '357 Test St, San Jose, CA 94088',
				phone_number: '2345678910',
				email: 'mike.test@test.com'
			}
		];

		prismaMock.borrower.findMany.mockResolvedValue(borrowers);

		await expect(service.getAll()).resolves.toHaveLength(2);
	});

	it('should find one borrower', async () => {
		const borrower: Borrower = {
      id: 1,
      name: 'Test Name',
      address: '123 Test St, Los Angeles, CA 90210',
      phone_number: '1234567890',
      email: 'user@test.com'
    }
		prismaMock.borrower.findFirst.mockResolvedValue(borrower);

		await expect(service.getOne('1')).resolves.toEqual(borrower);
	});

	it('should error if no borrower is found', async () => {
		prismaMock.borrower.findFirst.mockImplementation();

		await expect(service.getOne('1')).rejects.toEqual(
			new ReferenceError('No borrower with id "1" was found.')
		);
	});

	it('should throw type error if id is not a number', async () => {
		await expect(service.getOne('one')).rejects.toEqual(
			new TypeError('Id must be a number.')
		);
	});

	it('should create a borrower', async () => {
		const borrower: Borrower = {
      id: 1,
      name: 'Test Name',
      address: '123 Test St, Los Angeles, CA 90210',
      phone_number: '1234567890',
      email: 'user@test.com'
    }

		prismaMock.borrower.create.mockResolvedValue(borrower);

		await expect(service.insertOne(borrower)).resolves.toEqual(borrower);
	});

	it("shouldn't create a borrower with bad data", async () => {
		const borrower: Borrower = {
      id: 1,
      name: 'Test Name',
      address: '123 Test St, Los Angeles, CA 90210',
      // @ts-ignore
      phone_number: 1234567890,
      email: 'user@test.com'
    }

		prismaMock.borrower.create.mockRejectedValue(borrower);

		// @ts-ignore
		await expect(service.insertOne(borrower)).rejects.toEqual(
			new TypeError('phone_number must be a string.')
		);
	});

	it('should update a borrower with good data', async () => {
		const borrowerBeforeUpdate: Borrower = {
			id: 1,
      name: 'Test Name',
      address: '123 Test St, Los Angeles, CA 90210',
      phone_number: '1234567890',
      email: 'user@test.com'
		};

		prismaMock.borrower.findFirst.mockResolvedValueOnce(borrowerBeforeUpdate);

		const borrowerAfterUpdate: Borrower = {
			id: 1,
      name: 'Test Name UPDATE',
      address: '123 Test St, Los Angeles, CA 90210 UPDATED',
      phone_number: '1234567890 UPDATED',
      email: 'user@test.com UPDATED'
		};

		prismaMock.borrower.update.mockResolvedValueOnce(borrowerAfterUpdate);

		await expect(service.updateOne('1', borrowerAfterUpdate)).resolves.toEqual(
			borrowerAfterUpdate
		);
	});

	it('should throw a type error on update', async () => {
		const borrowerBeforeUpdate: Borrower = {
			id: 1,
      name: 'Test Name',
      address: '123 Test St, Los Angeles, CA 90210',
      phone_number: '1234567890',
      email: 'user@test.com'
		};

		prismaMock.borrower.findFirst.mockResolvedValueOnce(borrowerBeforeUpdate);

		const borrowerAfterUpdate: Borrower = {
			id: 1,
      name: 'Test Name',
      address: '123 Test St, Los Angeles, CA 90210',
      // @ts-ignore
      phone_number: 1234567890,
      email: 'user@test.com'
		};

		prismaMock.borrower.update.mockRejectedValueOnce(borrowerAfterUpdate);

		await expect(service.updateOne('1', borrowerAfterUpdate)).rejects.toEqual(
			new TypeError('phone_number must be a string.')
		);
	});

	it('should throw a reference error on update', async () => {
		// @ts-ignore
		const borrower: Borrower = {};

		await expect(service.updateOne('1', borrower)).rejects.toEqual(
			new ReferenceError('No borrower with id "1" was found.')
		);
	});

	it('should succesfully delete a borrower', async () => {
		const borrowerToDelete: Borrower = {
			id: 1,
      name: 'Test Name',
      address: '123 Test St, Los Angeles, CA 90210',
      phone_number: '1234567890',
      email: 'user@test.com'
		};

		prismaMock.borrower.findFirst.mockResolvedValueOnce(borrowerToDelete);

		prismaMock.borrower.delete.mockResolvedValueOnce(borrowerToDelete);

		await expect(service.deleteOne('1')).resolves.not.toThrow();
	});
});