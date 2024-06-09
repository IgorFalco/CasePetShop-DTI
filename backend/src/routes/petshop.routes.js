import express from 'express';
import petShopController from '../controllers/petshop.controller.js';

const petShopRouter = express.Router();
const petShopCtrl = new petShopController();

petShopRouter.get('/', (req, res) => petShopCtrl.getAll(req, res));
petShopRouter.get('/calculate', (req, res) => petShopCtrl.getBestPetShop(req, res));

export default petShopRouter;