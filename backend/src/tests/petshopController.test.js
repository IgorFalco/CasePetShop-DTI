import petShopController from '../controllers/petshop.controller.js';
import petShop from '../services/petshop.services.js';
import { describe, it, expect } from '@jest/globals';

jest.mock('../services/petshop.services.js');

describe('petShop Controller', () => {
    let controller;

    beforeEach(() => {
        controller = new petShopController();
    });

    it('should get all petshops', async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockPetshops = [{ name: 'PetShop1' }, { name: 'PetShop2' }];
        petShop.prototype.getAll.mockResolvedValue(mockPetshops);

        await controller.getAll(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockPetshops);
    });

    it('should get the best petshop', async () => {
        const req = { body: { date: '2023-06-10', numSmallDogs: '2', numBigDogs: '3' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockBestPetShop = { name: 'PetShop2', distance: 10, price: 120 };
        petShop.prototype.findBestPetShop.mockResolvedValue(mockBestPetShop);

        await controller.getBestPetShop(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockBestPetShop);
    });

    it('should handle validation errors', async () => {
        const req = { body: { date: '2023-06-10', numSmallDogs: 'teste', numBigDogs: '3' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };

        await controller.getBestPetShop(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith(expect.objectContaining({ message: expect.any(String) }));
    });
});
