import { Borrower } from '@prisma/client';
import { Request, Response } from 'express';
import { BorrowerService } from '../services/borrower.service.js';

export function borrowerController(service: BorrowerService) {
	const getAllBorrowers = async (_req: Request, res: Response) => {
		try {
			const borrowers: Borrower[] = await service.getAll();
			res.status(200);
			res.json(borrowers);
		} catch (err) {
			if (err instanceof ReferenceError) {
				res.status(404);
				res.json({ error: err.message });
				return;
			}
			res.status(400);
			res.json({ error: 'Something went wrong.' });
		}
	};

	const getOneBorrower = async (req: Request, res: Response) => {
		try {
			const borrower: Borrower = await service.getOne(req.params.id);
			res.status(200);
			res.json(borrower);
		} catch (err) {
			if (err instanceof ReferenceError) {
				res.status(404);
				res.json({ error: err.message });
				return;
			}
			if (err instanceof TypeError) {
				res.status(400);
				res.json({ error: err.message });
				return;
			}
			res.status(400);
			res.json({ error: 'Something went wrong.' });
		}
	};

	const insertOneBorrower = async (req: Request, res: Response) => {
		try {
			const borrower: Borrower = await service.insertOne(req.body);
			res.status(201);
			res.json(borrower);
		} catch (err) {
			res.status(400);
			res.json({ error: err.message });
		}
	};

	const updateBorrower = async (req: Request, res: Response) => {
		try {
			const borrower: Borrower = await service.updateOne(req.params.id, req.body);
			res.status(200);
			res.json(borrower);
		} catch (err) {
			if (err instanceof ReferenceError) {
				res.status(404);
				res.json({ error: err.message });
				return;
			}
			if (err instanceof TypeError) {
				res.status(400);
				res.json({ error: err.message });
				return;
			}
			res.status(500);
			res.json({ error: 'Something went wrong.' });
		}
	};

	const deleteBorrower = async (req: Request, res: Response) => {
		try {
			await service.deleteOne(req.params.id);
			res.status(204);
		} catch (err) {
			if (err instanceof ReferenceError) {
				res.status(404);
				res.json({ error: err.message });
				return;
			}
			if (err instanceof TypeError) {
				res.status(400);
				res.json({ error: err.message });
				return;
			}
			res.status(500);
			res.json({ error: 'Something went wrong.' });
		}
	};

	return {
		getAllBorrowers,
		getOneBorrower,
		insertOneBorrower,
		updateBorrower,
		deleteBorrower
	};
}
