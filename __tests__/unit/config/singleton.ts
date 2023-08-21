import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';

import prisma from './client';
import { Client } from '../../../src/models/client';

jest.mock('./client', () => ({
	__esModule: true,
	default: mockDeep<Client>()
}));

beforeEach(() => {
	mockReset(prismaMock);
});

export const prismaMock = prisma as unknown as DeepMockProxy<Client>;
