import petShop from '../services/petshop.services.js';
import { isHoliday, isWeekend } from '../utils/petshop.utils.js';
import fs from 'fs';
import { describe, it, expect } from '@jest/globals';

jest.mock('../utils/petshop.utils.js');
jest.mock('fs');

describe('petShop Service', () => {
    let service;

    beforeEach(() => {
        service = new petShop();
        fs.__setMockData(JSON.stringify({
            petshops: [
                { name: 'PetShopWeekend', prices: { weekdays: { small: 50, large: 50 }, weekends: { small: 5, large: 5 } }, distance: 15, usefulDay: true },
                { name: 'PetShop1', prices: { weekdays: { small: 20, large: 40 }, weekends: { small: 25, large: 50 } }, distance: 5, usefulDay: true },
                { name: 'PetShop2', prices: { weekdays: { small: 15, large: 30 }, weekends: { small: 20, large: 45 } }, distance: 10, usefulDay: false }

            ]
        }));
    });

    it('should return all petshops', () => {
        const petshops = service.getAll();
        expect(petshops).toHaveLength(3);
    });

    it('should calculate the correct price', async () => {
        isHoliday.mockResolvedValueOnce(false);
        isWeekend.mockReturnValueOnce(false);

        const price = await service.getPrice(
            { name: 'PetShop1', prices: { weekdays: { small: 20, large: 40 }, weekends: { small: 25, large: 50 } }, distance: 5, usefulDay: true },
            '2023-06-10',
            2,
            3
        );

        expect(price).toBe(160); // 2 * 20 + 3 * 40
    });

    it('should find the best petshop on  a weekday', async () => {
        isHoliday.mockResolvedValueOnce(false);
        isWeekend.mockReturnValueOnce(false);

        const bestPetShop = await service.findBestPetShop('2023-06-10', 2, 3);
        expect(bestPetShop).toEqual({ name: 'PetShop2', distance: 10, price: 120 }); // 2 * 15 + 3 * 30
    });

    it('should find the best petshop on a weekend', async () => {
        isHoliday.mockResolvedValueOnce(false);
        isWeekend.mockReturnValueOnce(true);

        const bestPetShop = await service.findBestPetShop('2023-06-09', 2, 3);
        expect(bestPetShop).toEqual({ name: 'PetShopWeekend', distance: 15, price: 25 }); // 2 * 5 + 3 * 5
    });
});
