import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import router from './routes/routes.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use('/', router);

export default app;
