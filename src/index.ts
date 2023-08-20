import express from 'express';
import { Client } from './models/client';
import { router } from './routes/router';
const app = express();
const client = new Client();

router(app, client);

app.listen(3000, () => {
	console.log('Listening on port 3000');
});
