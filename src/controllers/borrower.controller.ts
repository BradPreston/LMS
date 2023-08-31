import { Borrower } from '@prisma/client';
import { Request, Response } from 'express';
import { BorrowerService } from '../services/borrower.service';

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

	return {
		getAllBorrowers
	};
}
