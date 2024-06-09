import express from 'express';
import petShopRouter from './petshop.routes.js';

const router = express.Router();

router.use('/', petShopRouter);

export default router;
