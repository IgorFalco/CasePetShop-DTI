import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/', router);


export default app;
