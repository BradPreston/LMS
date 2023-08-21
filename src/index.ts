import express from 'express';
import { Client } from './models/client';
import { router } from './routes/router';
import dotenv from 'dotenv';
import { exit } from 'process';

const env = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
if (env.error) {
	console.error(env.error.message);
	exit(1);
}

const PORT = process.env.PORT || 3000;

const app = express();
const client = new Client({
	datasources: {
		db: {
			url: process.env.DATABASE_URL
		}
	}
});

app.use(express.json());

router(app, client);

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
