import express from 'express';
import { Client } from './models/client';
import { router } from './routes/router';
const app = express();
const client = new Client();

router(app, client);

console.log('listening on port 3000');
app.listen(3000);
